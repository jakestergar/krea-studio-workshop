<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';

	type Props = {
		direction?: 'left' | 'right';
		speed?: number;
		pauseOnHover?: boolean;
		class?: string;
		children: Snippet;
	};

	let {
		direction = 'left',
		speed = 30,
		pauseOnHover = true,
		class: className = '',
		children
	}: Props = $props();

	let containerRef: HTMLDivElement;
	let contentRef: HTMLDivElement;
	let animationDuration = $state('20s');

	onMount(() => {
		if (contentRef) {
			const contentWidth = contentRef.scrollWidth;
			const duration = contentWidth / speed;
			animationDuration = `${duration}s`;
		}
	});
</script>

<div
	bind:this={containerRef}
	class="marquee-container overflow-hidden {className}"
	class:pause-on-hover={pauseOnHover}
>
	<div
		bind:this={contentRef}
		class="marquee-content flex"
		class:animate-left={direction === 'left'}
		class:animate-right={direction === 'right'}
		style="--marquee-duration: {animationDuration}"
	>
		<div class="flex shrink-0">
			{@render children()}
		</div>
		<div class="flex shrink-0" aria-hidden="true">
			{@render children()}
		</div>
		<div class="flex shrink-0" aria-hidden="true">
			{@render children()}
		</div>
	</div>
</div>

<style>
	.marquee-container {
		width: 100%;
	}

	.marquee-content {
		width: max-content;
	}

	.animate-left {
		animation: scroll-left var(--marquee-duration, 20s) linear infinite;
	}

	.animate-right {
		animation: scroll-right var(--marquee-duration, 20s) linear infinite;
	}

	.pause-on-hover:hover .marquee-content {
		animation-play-state: paused;
	}

	@keyframes scroll-left {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-33.333%);
		}
	}

	@keyframes scroll-right {
		from {
			transform: translateX(-33.333%);
		}
		to {
			transform: translateX(0);
		}
	}
</style>
