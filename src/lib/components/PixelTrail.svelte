<script lang="ts">
	import { onMount } from 'svelte';
	import { animate } from 'motion';

	interface Props {
		pixelSize?: number;
		fadeDuration?: number;
		delay?: number;
		class?: string;
		pixelClassName?: string;
	}

	let {
		pixelSize = 20,
		fadeDuration = 500,
		delay = 0,
		class: className = '',
		pixelClassName = ''
	}: Props = $props();

	let containerRef: HTMLDivElement;
	let columns = $state(0);
	let rows = $state(0);
	let trailId = $state('');

	onMount(() => {
		// Generate unique ID
		trailId = `pixel-trail-${Math.random().toString(36).substr(2, 9)}`;

		// Calculate grid dimensions
		updateDimensions();

		// Listen for resize
		const resizeObserver = new ResizeObserver(() => {
			updateDimensions();
		});

		resizeObserver.observe(containerRef);

		return () => {
			resizeObserver.disconnect();
		};
	});

	function updateDimensions() {
		if (!containerRef) return;
		const rect = containerRef.getBoundingClientRect();
		columns = Math.ceil(rect.width / pixelSize);
		rows = Math.ceil(rect.height / pixelSize);
	}

	function handleMouseMove(e: MouseEvent) {
		if (!containerRef) return;

		const rect = containerRef.getBoundingClientRect();
		const x = Math.floor((e.clientX - rect.left) / pixelSize);
		const y = Math.floor((e.clientY - rect.top) / pixelSize);

		const pixelElement = document.getElementById(`${trailId}-pixel-${x}-${y}`);
		if (pixelElement) {
			// Animate the pixel
			animate(
				pixelElement,
				{ opacity: [1, 0] },
				{ duration: fadeDuration / 1000, delay: delay / 1000 }
			);
		}
	}
</script>

<div
	bind:this={containerRef}
	class="absolute inset-0 w-full h-full pointer-events-auto {className}"
	onmousemove={handleMouseMove}
>
	{#if trailId}
		{#each Array(rows) as _, rowIndex}
			<div class="flex">
				{#each Array(columns) as _, colIndex}
					<div
						id="{trailId}-pixel-{colIndex}-{rowIndex}"
						class="{pixelClassName}"
						style="width: {pixelSize}px; height: {pixelSize}px; opacity: 0;"
					></div>
				{/each}
			</div>
		{/each}
	{/if}
</div>
