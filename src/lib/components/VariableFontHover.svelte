<script lang="ts">
	import { onMount } from 'svelte';
	import { animate } from 'motion';

	interface Props {
		label: string;
		fromFontVariationSettings?: string;
		toFontVariationSettings?: string;
		staggerDuration?: number;
		class?: string;
		href?: string;
	}

	let {
		label,
		fromFontVariationSettings = "'wght' 400",
		toFontVariationSettings = "'wght' 700",
		staggerDuration = 0.03,
		class: className = '',
		href
	}: Props = $props();

	let containerRef: HTMLElement;
	let shuffledIndices: number[] = $state([]);

	// Shuffle array function
	function shuffleArray(array: number[]) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	onMount(() => {
		const indices = Array.from({ length: label.length }, (_, i) => i);
		shuffledIndices = shuffleArray([...indices]);
	});

	function handleMouseEnter() {
		if (!containerRef) return;
		const letters = containerRef.querySelectorAll('.hover-letter');

		letters.forEach((letter, i) => {
			const el = letter as HTMLElement;
			const shuffledIndex = shuffledIndices[i] ?? i;
			const delay = staggerDuration * shuffledIndex;

			animate(
				el,
				{ fontVariationSettings: toFontVariationSettings },
				{ delay, duration: 0.4, easing: [0.34, 1.56, 0.64, 1] }
			);
		});
	}

	function handleMouseLeave() {
		if (!containerRef) return;
		const letters = containerRef.querySelectorAll('.hover-letter');

		letters.forEach((letter, i) => {
			const el = letter as HTMLElement;
			const shuffledIndex = shuffledIndices[i] ?? i;
			const delay = staggerDuration * shuffledIndex;

			animate(
				el,
				{ fontVariationSettings: fromFontVariationSettings },
				{ delay, duration: 0.4, easing: [0.25, 0.1, 0.25, 1] }
			);
		});
	}

	const letters = label.split('');
</script>

{#if href}
	<a
		{href}
		class={className}
		bind:this={containerRef}
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
	>
		<span class="sr-only">{label}</span>
		{#each letters as letter, i}
			<span
				class="hover-letter inline-block whitespace-pre"
				style="font-variation-settings: {fromFontVariationSettings}"
				aria-hidden="true"
			>{letter}</span>
		{/each}
	</a>
{:else}
	<span
		class={className}
		bind:this={containerRef}
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
	>
		<span class="sr-only">{label}</span>
		{#each letters as letter, i}
			<span
				class="hover-letter inline-block whitespace-pre"
				style="font-variation-settings: {fromFontVariationSettings}"
				aria-hidden="true"
			>{letter}</span>
		{/each}
	</span>
{/if}
