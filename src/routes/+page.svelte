<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import Button from '$lib/components/Button.svelte';
	import Accordion from '$lib/components/Accordion.svelte';
	import ProfileCard from '$lib/components/ProfileCard.svelte';
	import TextAlongPath from '$lib/components/TextAlongPath.svelte';
	import Marquee from '$lib/components/Marquee.svelte';
	import TextRotate from '$lib/components/TextRotate.svelte';
	import VariableFontHover from '$lib/components/VariableFontHover.svelte';
	import PixelTrail from '$lib/components/PixelTrail.svelte';
	import { Check, ChevronDown } from 'lucide-svelte';

	let mounted = $state(false);

	// FAQ state
	let openFaq = $state<string | null>(null);

	function toggleFaq(id: string) {
		openFaq = openFaq === id ? null : id;
	}

	const faqItems = [
		{
			id: 'cost',
			question: 'Does it cost money?',
			answer: 'No, the workshop is completely free for invited teams.'
		},
		{
			id: 'covered',
			question: 'What is covered in a workshop?',
			answer: `<p class="mb-3"><strong>Master Krea's complete creative AI platform</strong> in this comprehensive hands-on training session. You'll learn how to leverage 55+ AI models for professional content creation, from concept to final production.</p>
<p class="mb-3"><strong>Model expertise:</strong> Understand when to use each model for optimal results - from photorealistic product shots with Krea 1, to architectural precision with Nano Banana Pro, to creative ideation with Flux. We'll demonstrate real-time generation capabilities and show you how to select the right tool for every creative challenge.</p>
<p class="mb-3"><strong>Brand consistency at scale:</strong> Learn to create custom style models using your brand assets, maintain visual consistency across thousands of assets, and build reusable brand libraries your entire team can access. We'll cover advanced techniques like LoRA training, style transfer, and brand guideline integration.</p>
<p class="mb-3"><strong>Team collaboration:</strong> Discover enterprise features including shared workspaces, asset libraries, usage analytics, and admin controls. Understand how to structure teams, manage credits efficiently, and maintain quality control across large creative operations.</p>
<p><strong>Workflow automation:</strong> Build drag-and-drop workflows that turn complex multi-step processes into simple, repeatable tools. Learn to create mini-apps from your workflows and integrate Krea with existing systems through API access. Ultimately - we want to craft the exact agenda together to be sure it's relevant for your entire team.</p>`
		},
		{
			id: 'format',
			question: 'Is it in person or virtual?',
			answer: 'Either! We love doing workshops in person, but we can also do them virtually.'
		}
	];

	// Form state
	let formData = $state({
		name: '',
		company: '',
		selectedDates: [] as string[],
		isFlexible: false,
		urgency: 3
	});

	let isSubmitting = $state(false);
	let submitSuccess = $state(false);

	// Available dates
	const availableDates = [
		{ value: 'feb-10', label: 'Feb 10' },
		{ value: 'feb-17', label: 'Feb 17' },
		{ value: 'feb-24', label: 'Feb 24' },
		{ value: 'mar-3', label: 'Mar 3' }
	];

	const urgencyLabels = [
		"Just curious",
		"Exploring options",
		"Planning ahead",
		"Ready to start",
		"Need this yesterday"
	];

	// Accordion content
	const accordionItems = [
		{
			id: 'workshop-details',
			title: 'Workshop Details',
			content: 'An immersive, hands-on session designed for teams and creators who want to unlock the full potential of Krea\'s creative AI suite. You\'ll work directly with our team on your real projects and workflows.'
		},
		{
			id: 'benefits',
			title: 'What You\'ll Gain',
			content: 'Personalized guidance tailored to your creative needs. Direct access to Krea\'s product experts. Custom workflow optimization. Priority support and early access to new features.'
		},
		{
			id: 'faq',
			title: 'FAQ',
			content: 'Sessions are conducted virtually via video call. Each workshop is limited to ensure personalized attention. No prior experience with Krea is required—we\'ll meet you where you are.'
		}
	];

	// Company logos with SVG icons
	const companyLogos = [
		{ name: 'Microsoft', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h11.5v11.5H0V0zm12.5 0H24v11.5H12.5V0zM0 12.5h11.5V24H0V12.5zm12.5 0H24V24H12.5V12.5z"/></svg>` },
		{ name: 'Shopify', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.34 4.46c-.07 0-.13.04-.16.1-.02.05-.4 1.17-.4 1.17-.26-.8-.73-1.54-1.54-1.54-.02 0-.05 0-.07.01-.23-.3-.51-.43-.76-.43-1.88 0-2.78 2.35-3.06 3.54-.73.23-1.24.38-1.3.4-.41.13-.42.14-.47.53-.04.28-1.1 8.5-1.1 8.5l8.79 1.52V4.47c-.04-.01-.08-.01-.13-.01l.2-.01zm-1.87 1.2v.11c-.42.13-.87.27-1.33.41.26-.99.75-1.47 1.17-1.65.1.27.16.62.16 1.13zm-.82-1.47c.08 0 .16.03.23.08-.55.26-1.15.91-1.4 2.22-.37.11-.73.23-1.07.33.3-1.01.99-2.63 2.24-2.63zm.33 5.47s-.48-.26-.48-.26v.04s-1.66 5.1-1.66 5.1l4.52.78V5.81c-.31.1-1.33.44-2.38.85z"/></svg>` },
		{ name: 'Lego', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><text x="0" y="18" font-size="14" font-weight="bold">LEGO</text></svg>` },
		{ name: 'Samsung', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 8h20v8H2V8zm1 1v6h18V9H3z"/><text x="4" y="14.5" font-size="5" font-weight="bold">SAMSUNG</text></svg>` },
		{ name: 'Nike', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.669.925-1.124 0-1.954-.392-2.492-1.177C-.39 14.027.293 12.44 2.05 10.7l1.296.832C2.122 12.636 1.5 13.5 1.5 14.1c0 .392.166.687.498.885.332.198.787.297 1.366.297.877 0 2.044-.283 3.5-.85L24 7.8z"/></svg>` },
		{ name: 'Microsoft', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M0 0h11.5v11.5H0V0zm12.5 0H24v11.5H12.5V0zM0 12.5h11.5V24H0V12.5zm12.5 0H24V24H12.5V12.5z"/></svg>` }
	];

	// Team members
	const teamMembers = [
		{
			name: 'Rebecca Kunnis',
			title: 'Krea Studio Ambassador',
			imageUrl: `${base}/images/becca headshot.jpeg`,
			linkUrl: 'https://instagram.com/rebeccakunnis',
			linkType: 'instagram' as const
		},
		{
			name: 'Diego Rodriguez',
			title: 'CTO & Co-founder of Krea',
			imageUrl: `${base}/images/diego headshot.jpeg`,
			linkUrl: 'https://linkedin.com/in/diegor',
			linkType: 'linkedin' as const
		},
		{
			name: 'Gabe Michael',
			title: 'Krea Ambassador, Award-winning Producer',
			imageUrl: `${base}/images/gabemichael headshot.jpeg`,
			linkUrl: 'https://gabemichael.ai/',
			linkType: 'website' as const
		}
	];

	// Rounded rectangle path for animated text border - full width version
	const rectPath =
		"M 20,10 L 980,10 A 10,10 0 0,1 990,20 L 990,280 A 10,10 0 0,1 980,290 L 20,290 A 10,10 0 0,1 10,280 L 10,20 A 10,10 0 0,1 20,10";

	onMount(() => {
		mounted = true;
	});

	function toggleDate(value: string) {
		if (formData.selectedDates.includes(value)) {
			formData.selectedDates = formData.selectedDates.filter((d) => d !== value);
		} else {
			formData.selectedDates = [...formData.selectedDates, value];
		}
	}

	function toggleFlexible() {
		formData.isFlexible = !formData.isFlexible;
		if (formData.isFlexible) {
			formData.selectedDates = [];
		}
	}

	async function handleSubmit(e: Event) {
		e.preventDefault();
		isSubmitting = true;
		await new Promise((resolve) => setTimeout(resolve, 1000));
		console.log('Form submitted:', formData);
		submitSuccess = true;
		isSubmitting = false;
	}
</script>

<main class="min-h-screen bg-white text-primary-900 relative">
	<!-- Pixel Trail Effect -->
	<div class="fixed inset-0 z-0 pointer-events-auto">
		<PixelTrail
			pixelSize={24}
			fadeDuration={500}
			delay={0}
			pixelClassName="bg-primary-200"
		/>
	</div>

	<!-- Hero Section -->
	<section class="relative z-10 flex flex-col items-center justify-center px-6 pt-10 pb-6">
		<div class="max-w-2xl mx-auto">
			<p class="text-primary-500 text-xs tracking-[0.2em] uppercase mb-4 text-center">
				You're specially invited to
			</p>

			<h1 class="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-snug mb-4 text-primary-900 text-center">
				Krea Studio Workshop
			</h1>

			<div class="text-sm md:text-base text-primary-500 mb-6 leading-relaxed flex items-center gap-x-2">
				<span class="shrink-0">Help your team</span>
				<TextRotate
					texts={[
						'become AI proficient',
						'learn from the best',
						'work more quickly',
						'multiply their output',
						'have fun'
					]}
					mainClassName="bg-primary-900 text-white px-3 py-1.5 rounded-lg font-medium"
					splitLevelClassName="overflow-hidden"
					elementLevelClassName="pb-0.5"
					rotationInterval={2500}
					staggerDuration={0.02}
					staggerFrom="first"
				/>
			</div>

			<!-- Register Now Button -->
			<a
				href="#signup"
				class="register-btn inline-block w-full bg-primary-900 text-white text-base font-medium py-3 px-6 rounded-xl transition-all text-center"
			>
				Register Now
			</a>
			</div>
	</section>

	<!-- Studio Team Section -->
	<section class="relative z-10 px-6 py-6">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-lg font-medium tracking-snug mb-1 text-primary-900">
				Meet the Studio Team
			</h2>
			<p class="text-xs text-primary-500 mb-6">
				Learn from the creators and builders behind Krea
			</p>

			<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
				{#each teamMembers as member}
					<ProfileCard
						name={member.name}
						title={member.title}
						imageUrl={member.imageUrl}
						linkUrl={member.linkUrl}
						linkType={member.linkType}
					/>
				{/each}
			</div>
		</div>
	</section>

	<!-- Workshop Details Section -->
	<section class="relative z-10 py-8 border-y border-primary-200 bg-white">
		<div class="max-w-4xl mx-auto px-6 mb-8">
			<h2 class="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-snug text-primary-900 leading-tight">
				Hands on training of the most advanced AI creative suite.
			</h2>
		</div>

		<!-- Video Marquee -->
		<div
			class="video-marquee-container"
			onmouseenter={() => { document.querySelectorAll('.video-marquee-container video').forEach(v => (v as HTMLVideoElement).pause()); }}
			onmouseleave={() => { document.querySelectorAll('.video-marquee-container video').forEach(v => (v as HTMLVideoElement).play()); }}
		>
			<Marquee speed={25} pauseOnHover={true}>
				<div class="flex items-start gap-4 px-2">
					<div
						class="shrink-0"
						onmouseenter={(e) => { const video = e.currentTarget.querySelector('video'); if (video) video.play(); }}
					>
						<div class="w-40 h-24 rounded-lg overflow-hidden bg-primary-100">
							<video
								src="{base}/videos/realtime-chair.webm"
								muted
								loop
								playsinline
								autoplay
								class="w-full h-full object-cover"
							></video>
						</div>
						<p class="text-[11px] text-primary-500 mt-1.5">Real Time Edit</p>
					</div>
					<div
						class="shrink-0"
						onmouseenter={(e) => { const video = e.currentTarget.querySelector('video'); if (video) video.play(); }}
					>
						<div class="w-40 h-24 rounded-lg overflow-hidden bg-primary-100">
							<video
								src="https://s.krea.ai/nodes-announcement-video.mp4"
								muted
								loop
								playsinline
								autoplay
								class="w-full h-full object-cover"
							></video>
						</div>
						<p class="text-[11px] text-primary-500 mt-1.5">Krea Nodes</p>
					</div>
					<div
						class="shrink-0"
						onmouseenter={(e) => { const video = e.currentTarget.querySelector('video'); if (video) video.play(); }}
					>
						<div class="w-40 h-24 rounded-lg overflow-hidden bg-primary-100">
							<video
								src="https://s.krea.ai/nano-banana-elements_1.mp4"
								muted
								loop
								playsinline
								autoplay
								class="w-full h-full object-cover"
							></video>
						</div>
						<p class="text-[11px] text-primary-500 mt-1.5">Nano Banana Elements</p>
					</div>
					<div
						class="shrink-0"
						onmouseenter={(e) => { const video = e.currentTarget.querySelector('video'); if (video) video.play(); }}
					>
						<div class="w-40 h-24 rounded-lg overflow-hidden bg-primary-100">
							<video
								src="https://s.krea.ai/editorToolDemo_lowBitrate.mp4"
								muted
								loop
								playsinline
								autoplay
								class="w-full h-full object-cover"
							></video>
						</div>
						<p class="text-[11px] text-primary-500 mt-1.5">Advanced Edit</p>
					</div>
					<div
						class="shrink-0"
						onmouseenter={(e) => { const video = e.currentTarget.querySelector('video'); if (video) video.play(); }}
					>
						<div class="w-40 h-24 rounded-lg overflow-hidden bg-primary-100">
							<video
								src="https://s.krea.ai/realtimeToolDemo_lowBitrate.mp4"
								muted
								loop
								playsinline
								autoplay
								class="w-full h-full object-cover"
							></video>
						</div>
						<p class="text-[11px] text-primary-500 mt-1.5">Real Time Rendering</p>
					</div>
				</div>
			</Marquee>
		</div>
	</section>

	<!-- Sign Up Form Section -->
	<section id="signup" class="relative z-10 px-6 py-6 bg-white">
		<div class="max-w-md mx-auto relative">
			<!-- Animated text border -->
			<div class="absolute inset-0 pointer-events-none">
				<TextAlongPath
					path={rectPath}
					pathId="form-border"
					svgClassName="w-full h-full text-primary-400"
					viewBox="0 0 1000 300"
					text="SPOTS LIMITED. REGISTER YOUR TEAM'S WORKSHOP. ✦ SPOTS LIMITED. REGISTER YOUR TEAM'S WORKSHOP. ✦ SPOTS LIMITED. REGISTER YOUR TEAM'S WORKSHOP. ✦ "
					textClassName="text-[10px] uppercase tracking-[0.25em] font-medium"
					duration={30}
					preserveAspectRatio="none"
					textAnchor="start"
				/>
			</div>

			<!-- Form content -->
			<div class="relative z-10 p-4 md:p-5">
				<h2 class="text-lg font-semibold tracking-snug mb-1 text-primary-900">
					Sign Your Team Up
				</h2>
				<p class="text-xs text-primary-500 mb-3">
					Register for your team's exclusive workshop session
				</p>

				{#if submitSuccess}
					<div class="text-center py-4">
						<div class="w-12 h-12 bg-action/20 rounded-full flex items-center justify-center mx-auto mb-3">
							<Check size={24} class="text-action" />
						</div>
						<h3 class="text-base font-medium mb-1 text-primary-900">Thank you!</h3>
						<p class="text-xs text-primary-500">We'll be in touch soon to schedule your workshop.</p>
					</div>
				{:else}
					<form onsubmit={handleSubmit} class="space-y-2.5">
						<div class="grid grid-cols-2 gap-2.5">
							<div>
								<label for="name" class="block text-xs text-primary-700 mb-1">What's your name?</label>
								<input
									type="text"
									id="name"
									bind:value={formData.name}
									required
									class="w-full bg-primary-50 border border-primary-200 rounded-lg px-3 py-2 text-sm text-primary-900 placeholder:text-primary-400 focus:outline-none focus:border-primary-400 transition-colors"
									placeholder="Your name"
								/>
							</div>

							<div>
								<label for="company" class="block text-xs text-primary-700 mb-1">Who you with?</label>
								<input
									type="text"
									id="company"
									bind:value={formData.company}
									required
									class="w-full bg-primary-50 border border-primary-200 rounded-lg px-3 py-2 text-sm text-primary-900 placeholder:text-primary-400 focus:outline-none focus:border-primary-400 transition-colors"
									placeholder="Your company"
								/>
							</div>
						</div>

						<!-- Priority Slider -->
						<div>
							<label for="urgency" class="block text-xs text-primary-700 mb-1">How soon do you need this?</label>
							<input
								type="range"
								id="urgency"
								min="1"
								max="5"
								bind:value={formData.urgency}
								class="w-full"
							/>
							<p class="text-xs text-primary-500 mt-0.5 text-center">{urgencyLabels[formData.urgency - 1]}</p>
						</div>

						<div>
							<Button type="submit" disabled={isSubmitting} class="w-full" size="md">
								{isSubmitting ? 'Submitting...' : 'Register Your Team'}
							</Button>
							<p class="text-xs text-primary-500 text-center mt-2 italic">Limited Openings. First come first serve.</p>
						</div>
					</form>
				{/if}
			</div>
		</div>
	</section>

	<!-- FAQ Section -->
	<section class="relative z-10 px-6 py-8 bg-white">
		<div class="max-w-2xl mx-auto">
			<h2 class="text-lg font-medium tracking-snug mb-4 text-primary-900">
				Frequently Asked Questions
			</h2>

			<div class="divide-y divide-primary-200">
				{#each faqItems as item}
					<div class="py-3">
						<button
							type="button"
							onclick={() => toggleFaq(item.id)}
							class="w-full flex items-center justify-between text-left group"
						>
							<h3 class="text-sm font-medium text-primary-900 group-hover:text-primary-600 transition-colors">
								{item.question}
							</h3>
							<ChevronDown
								size={16}
								class="text-primary-400 transition-transform duration-200 {openFaq === item.id ? 'rotate-180' : ''}"
							/>
						</button>
						<div
							class="overflow-hidden transition-all duration-200 ease-out {openFaq === item.id ? 'max-h-[600px] opacity-100 mt-2' : 'max-h-0 opacity-0'}"
						>
							<div class="text-sm text-primary-500 [&_strong]:text-primary-700 [&_strong]:font-medium">
								{@html item.answer}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="relative z-10 px-6 py-6 mt-8 bg-white">
		<!-- Logo Bar -->
		<div class="max-w-4xl mx-auto mb-6">
			<div class="flex items-center justify-center gap-8 md:gap-12 opacity-40">
				<img src="{base}/images/logos/microsoft.svg" alt="Microsoft" class="h-5 w-auto" />
				<img src="{base}/images/logos/shopify.svg" alt="Shopify" class="h-5 w-auto" />
				<img src="{base}/images/logos/lego.svg" alt="Lego" class="h-5 w-auto" />
				<img src="{base}/images/logos/samsung.svg" alt="Samsung" class="h-4 w-auto" />
				<img src="{base}/images/logos/nike.svg" alt="Nike" class="h-4 w-auto" />
			</div>
		</div>

		<div class="max-w-2xl mx-auto flex items-center justify-between">
			<p class="text-[11px] text-primary-500">
				© {new Date().getFullYear()} Krea AI Inc.
			</p>
			<a
				href="https://krea.ai"
				target="_blank"
				rel="noopener noreferrer"
				class="text-[11px] text-primary-500 hover:text-primary-700 transition-colors"
			>
				krea.ai
			</a>
		</div>
	</footer>
</main>

<style>
	.register-btn {
		position: relative;
		overflow: hidden;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	}

	.register-btn:hover {
		transform: translateY(-2px);
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
		background-color: var(--color-primary-800);
	}

	.register-btn:active {
		transform: translateY(0);
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	}

	input[type='range'] {
		-webkit-appearance: none;
		appearance: none;
		background: transparent;
	}

	input[type='range']::-webkit-slider-runnable-track {
		width: 100%;
		height: 6px;
		background: linear-gradient(to right, var(--color-primary-300), var(--color-primary-900));
		border-radius: 3px;
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		width: 16px;
		height: 16px;
		background: var(--color-primary-900);
		border-radius: 50%;
		cursor: pointer;
		margin-top: -5px;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
	}

	input[type='range']::-moz-range-track {
		width: 100%;
		height: 6px;
		background: linear-gradient(to right, var(--color-primary-300), var(--color-primary-900));
		border-radius: 3px;
	}

	input[type='range']::-moz-range-thumb {
		width: 16px;
		height: 16px;
		background: var(--color-primary-900);
		border-radius: 50%;
		cursor: pointer;
		border: none;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
	}
</style>
