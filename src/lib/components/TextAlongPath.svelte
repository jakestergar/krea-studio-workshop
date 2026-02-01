<script lang="ts">
	type Props = {
		path: string;
		pathId?: string;
		pathClassName?: string;
		preserveAspectRatio?: string;
		showPath?: boolean;
		width?: string | number;
		height?: string | number;
		viewBox?: string;
		svgClassName?: string;
		text: string;
		textClassName?: string;
		textAnchor?: 'start' | 'middle' | 'end';
		duration?: number;
		repeatCount?: number | 'indefinite';
	};

	let {
		path,
		pathId,
		pathClassName = '',
		preserveAspectRatio = 'xMidYMid meet',
		showPath = false,
		width = '100%',
		height = '100%',
		viewBox = '0 0 100 100',
		svgClassName = '',
		text,
		textClassName = '',
		textAnchor = 'start',
		duration = 4,
		repeatCount = 'indefinite'
	}: Props = $props();

	// Generate a unique ID if not provided
	const id = pathId || `animated-path-${Math.random().toString(36).substring(7)}`;
</script>

<svg
	class={svgClassName}
	xmlns="http://www.w3.org/2000/svg"
	{width}
	{height}
	{viewBox}
	{preserveAspectRatio}
>
	<path
		id={id}
		class={pathClassName}
		d={path}
		stroke={showPath ? 'currentColor' : 'none'}
		fill="none"
	/>

	<!-- First text element -->
	<text text-anchor={textAnchor} fill="currentColor">
		<textPath class={textClassName} href={`#${id}`} startOffset="0%">
			<animate
				attributeName="startOffset"
				from="0%"
				to="100%"
				begin="0s"
				dur={`${duration}s`}
				{repeatCount}
			/>
			{text}
		</textPath>
	</text>

	<!-- Second text element (offset to hide the jump) -->
	<text text-anchor={textAnchor} fill="currentColor">
		<textPath class={textClassName} href={`#${id}`} startOffset="-100%">
			<animate
				attributeName="startOffset"
				from="-100%"
				to="0%"
				begin="0s"
				dur={`${duration}s`}
				{repeatCount}
			/>
			{text}
		</textPath>
	</text>
</svg>
