<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { animate } from 'motion';

	interface Props {
		texts: string[];
		rotationInterval?: number;
		staggerDuration?: number;
		staggerFrom?: 'first' | 'last' | 'center' | 'random';
		splitBy?: 'words' | 'characters';
		mainClassName?: string;
		splitLevelClassName?: string;
		elementLevelClassName?: string;
		loop?: boolean;
		auto?: boolean;
		initialY?: string;
		animateY?: number;
		exitY?: string;
		transition?: { type?: string; damping?: number; stiffness?: number; duration?: number };
	}

	let {
		texts,
		rotationInterval = 2000,
		staggerDuration = 0.025,
		staggerFrom = 'first',
		splitBy = 'characters',
		mainClassName = '',
		splitLevelClassName = '',
		elementLevelClassName = '',
		loop = true,
		auto = true,
		initialY = '100%',
		animateY = 0,
		exitY = '-120%',
		transition = { type: 'spring', damping: 30, stiffness: 400 }
	}: Props = $props();

	let currentIndex = $state(0);
	let containerEl: HTMLElement;
	let intervalId: ReturnType<typeof setInterval> | null = null;
	let isAnimating = $state(false);

	// Split text into characters with proper unicode handling
	function splitIntoCharacters(text: string): string[] {
		if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
			const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
			return Array.from(segmenter.segment(text), ({ segment }) => segment);
		}
		return Array.from(text);
	}

	// Get current text elements based on split method
	function getElements(text: string) {
		if (splitBy === 'characters') {
			const words = text.split(' ');
			return words.map((word, i) => ({
				characters: splitIntoCharacters(word),
				needsSpace: i !== words.length - 1
			}));
		}
		return text.split(' ').map((word, i, arr) => ({
			characters: [word],
			needsSpace: i !== arr.length - 1
		}));
	}

	// Calculate stagger delay
	function getStaggerDelay(index: number, total: number): number {
		if (staggerFrom === 'first') return index * staggerDuration;
		if (staggerFrom === 'last') return (total - 1 - index) * staggerDuration;
		if (staggerFrom === 'center') {
			const center = Math.floor(total / 2);
			return Math.abs(center - index) * staggerDuration;
		}
		if (staggerFrom === 'random') {
			return Math.random() * total * staggerDuration;
		}
		return index * staggerDuration;
	}

	// Animate text in
	async function animateIn() {
		if (!containerEl) return;

		const chars = containerEl.querySelectorAll('.text-rotate-char');
		const total = chars.length;

		const animations = Array.from(chars).map((char, index) => {
			const el = char as HTMLElement;
			el.style.transform = `translateY(${initialY})`;
			el.style.opacity = '0';

			const delay = getStaggerDelay(index, total);

			return animate(
				el,
				{
					transform: `translateY(${animateY}px)`,
					opacity: 1
				},
				{
					delay,
					duration: transition.duration || 0.4,
					easing: transition.type === 'spring'
						? [0.34, 1.56, 0.64, 1] // Spring-like easing
						: [0.25, 0.1, 0.25, 1]
				}
			);
		});

		await Promise.all(animations.map(a => a.finished));
	}

	// Animate text out
	async function animateOut() {
		if (!containerEl) return;

		const chars = containerEl.querySelectorAll('.text-rotate-char');
		const total = chars.length;

		const animations = Array.from(chars).map((char, index) => {
			const el = char as HTMLElement;
			const delay = getStaggerDelay(index, total);

			return animate(
				el,
				{
					transform: `translateY(${exitY})`,
					opacity: 0
				},
				{
					delay,
					duration: transition.duration || 0.3,
					easing: [0.25, 0.1, 0.25, 1]
				}
			);
		});

		await Promise.all(animations.map(a => a.finished));
	}

	// Rotate to next text
	async function next() {
		if (isAnimating) return;

		isAnimating = true;
		await animateOut();

		if (loop) {
			currentIndex = (currentIndex + 1) % texts.length;
		} else if (currentIndex < texts.length - 1) {
			currentIndex = currentIndex + 1;
		}

		// Wait for DOM to update
		await new Promise(resolve => setTimeout(resolve, 50));
		await animateIn();
		isAnimating = false;
	}

	// Get current elements
	let currentElements = $derived(getElements(texts[currentIndex]));

	onMount(async () => {
		// Initial animation
		await new Promise(resolve => setTimeout(resolve, 100));
		await animateIn();

		// Auto-rotate
		if (auto) {
			intervalId = setInterval(next, rotationInterval);
		}
	});

	onDestroy(() => {
		if (intervalId) {
			clearInterval(intervalId);
		}
	});
</script>

<span class="inline-flex flex-wrap {mainClassName}" bind:this={containerEl}>
	<span class="sr-only">{texts[currentIndex]}</span>

	{#key currentIndex}
		<span class="flex flex-wrap" aria-hidden="true">
			{#each currentElements as wordObj, wordIndex}
				<span class="inline-flex {splitLevelClassName}">
					{#each wordObj.characters as char, charIndex}
						<span class="overflow-hidden {elementLevelClassName}">
							<span
								class="text-rotate-char inline-block"
								style="transform: translateY({initialY}); opacity: 0;"
							>
								{char}
							</span>
						</span>
					{/each}
				</span>
				{#if wordObj.needsSpace}
					<span class="text-rotate-char inline-block" style="transform: translateY(0); opacity: 1;">&nbsp;</span>
				{/if}
			{/each}
		</span>
	{/key}
</span>
