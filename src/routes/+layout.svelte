<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>VIP Workshop | Krea Studio</title>
	<meta
		name="description"
		content="Join our exclusive VIP workshop experience. A white-glove service for creators and teams looking to master Krea's creative AI tools."
	/>
	<meta name="viewport" content="width=device-width, initial-scale=1" />
</svelte:head>

{@render children()}
