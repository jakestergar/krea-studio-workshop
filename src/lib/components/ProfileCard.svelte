<script lang="ts">
	import { ExternalLink } from 'lucide-svelte';

	type Props = {
		name: string;
		title: string;
		imageUrl?: string;
		linkUrl: string;
		linkType?: 'website' | 'linkedin' | 'instagram';
	};

	let { name, title, imageUrl, linkUrl, linkType = 'website' }: Props = $props();

	const linkLabels = {
		website: 'Website',
		linkedin: 'LinkedIn',
		instagram: 'Instagram'
	};
</script>

<a
	href={linkUrl}
	target="_blank"
	rel="noopener noreferrer"
	class="group block"
>
	<div class="relative overflow-hidden rounded-xl bg-primary-100 aspect-[4/5] mb-3">
		{#if imageUrl}
			<img
				src={imageUrl}
				alt={name}
				class="h-full w-full object-cover transition-all duration-500 ease-out grayscale group-hover:grayscale-0 group-hover:scale-105"
			/>
		{:else}
			<div class="h-full w-full flex items-center justify-center bg-primary-100">
				<span class="text-4xl text-primary-400">{name.charAt(0)}</span>
			</div>
		{/if}

		<!-- Hover overlay -->
		<div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
			<div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 text-white">
				<span class="text-xs font-medium">{linkLabels[linkType]}</span>
				<ExternalLink size={12} />
			</div>
		</div>
	</div>

	<h4 class="text-sm font-medium text-primary-900 tracking-snug group-hover:text-primary-600 transition-colors">
		{name}
	</h4>
	<p class="text-[11px] text-primary-500 mt-0.5">
		{title}
	</p>
</a>
