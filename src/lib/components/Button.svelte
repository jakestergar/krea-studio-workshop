<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';

	type Props = {
		variant?: 'primary' | 'secondary' | 'ghost';
		size?: 'default' | 'sm' | 'lg';
		href?: string;
		children: Snippet;
	} & (HTMLButtonAttributes | HTMLAnchorAttributes);

	let { variant = 'primary', size = 'default', href, children, ...rest }: Props = $props();

	const baseClasses =
		'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-out active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none';

	const variants = {
		primary:
			'bg-primary-900 hover:bg-primary-800 text-white rounded-lg',
		secondary:
			'bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-lg border border-primary-200',
		ghost: 'hover:bg-primary-100 text-primary-700 rounded-lg'
	};

	const sizes = {
		default: 'h-9 px-4 text-xs',
		sm: 'h-8 px-3 text-xs',
		lg: 'h-11 px-6 text-sm'
	};

	const classes = `${baseClasses} ${variants[variant]} ${sizes[size]}`;
</script>

{#if href}
	<a {href} class={classes} {...rest}>
		{@render children()}
	</a>
{:else}
	<button class={classes} {...rest}>
		{@render children()}
	</button>
{/if}
