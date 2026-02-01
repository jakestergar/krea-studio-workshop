<script lang="ts">
	import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { ChevronDown } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	type AccordionItem = {
		id: string;
		title: string;
		content: string | Snippet;
	};

	type Props = {
		items: AccordionItem[];
	};

	let { items }: Props = $props();

	let openItems = $state<Set<string>>(new Set());

	function toggleItem(id: string) {
		if (openItems.has(id)) {
			openItems.delete(id);
		} else {
			openItems.add(id);
		}
		openItems = new Set(openItems);
	}

	function isOpen(id: string): boolean {
		return openItems.has(id);
	}
</script>

<div class="divide-y divide-primary-200">
	{#each items as item (item.id)}
		{@const open = isOpen(item.id)}
		<div class="py-4">
			<button
				onclick={() => toggleItem(item.id)}
				class="flex w-full items-center justify-between text-left group"
				aria-expanded={open}
				aria-controls={`accordion-content-${item.id}`}
			>
				<h3 class="text-sm md:text-base font-medium tracking-snug text-primary-900 group-hover:text-primary-600 transition-colors duration-200">
					{item.title}
				</h3>
				<div
					class="ml-3 flex-shrink-0 text-primary-400 transition-transform duration-300 ease-out {open
						? 'rotate-180'
						: ''}"
				>
					<ChevronDown size={16} strokeWidth={2} />
				</div>
			</button>

			{#if open}
				<div
					id={`accordion-content-${item.id}`}
					transition:slide={{ duration: 200, easing: cubicOut }}
					class="mt-3 text-xs text-primary-600 leading-relaxed"
				>
					{#if typeof item.content === 'string'}
						<p>{item.content}</p>
					{:else}
						{@render item.content()}
					{/if}
				</div>
			{/if}
		</div>
	{/each}
</div>
