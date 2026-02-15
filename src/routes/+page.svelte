<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { base } from '$app/paths';
	import Button from '$lib/components/Button.svelte';
	import TextRotate from '$lib/components/TextRotate.svelte';
	import TextAlongPath from '$lib/components/TextAlongPath.svelte';
	import Marquee from '$lib/components/Marquee.svelte';
	import Accordion from '$lib/components/Accordion.svelte';
	import PixelTrail from '$lib/components/PixelTrail.svelte';
	import { ChevronDown, Check, ArrowRight, Play } from 'lucide-svelte';

	let mounted = $state(false);

	// FAQ items for Accordion component
	const faqItems = [
		{
			id: 'student-access',
			title: 'How do students get access?',
			content: 'Sign up at krea.ai with your .edu email, then apply through the form below. Once approved, you get full access to Krea\'s creative AI tools.'
		},
		{
			id: 'educator',
			title: 'I\'m an educator — how does this work for my classroom?',
			content: 'We offer hands-on workshops for your class or department, plus education pricing for team accounts. Reach out through the form and select "Educator" — we\'ll set up a call to scope what works for your program.'
		},
		{
			id: 'includes',
			title: 'What tools do students get access to?',
			content: 'Everything — Real-Time Generation, Advanced Edit, Krea Nodes, 55+ AI models, custom style training, and drag-and-drop workflows. The same platform used professionally at Nike, A24, and Microsoft.'
		},
		{
			id: 'who',
			title: 'Who is this for?',
			content: 'Students in design, architecture, film, marketing, fine arts, or any creative discipline. If your work involves visual creation, Krea accelerates it.'
		},
		{
			id: 'commercial',
			title: 'Can I use what I make in my portfolio?',
			content: 'Yes. Work you create with Krea is yours. Use it in your portfolio, thesis, exhibitions — wherever you need it.'
		}
	];

	// Form state
	let formData = $state({
		name: '',
		email: '',
		institution: '',
		role: 'student'
	});

	let isSubmitting = $state(false);
	let submitSuccess = $state(false);

	const features = [
		{
			label: 'Real-Time Generation',
			video: `${base}/videos/realtime-chair.webm`
		},
		{
			label: 'Krea Nodes',
			video: 'https://s.krea.ai/nodes-announcement-video.mp4'
		},
		{
			label: 'Nano Banana Elements',
			video: 'https://s.krea.ai/nano-banana-elements_1.mp4'
		},
		{
			label: 'Advanced Edit',
			video: 'https://s.krea.ai/editorToolDemo_lowBitrate.mp4'
		},
		{
			label: 'Real-Time Rendering',
			video: 'https://s.krea.ai/realtimeToolDemo_lowBitrate.mp4'
		}
	];

	// Logo list for marquee
	const logos = [
		{ src: `${base}/images/logos/microsoft.svg`, alt: 'Microsoft', height: 'h-5' },
		{ src: `${base}/images/logos/nike.svg`, alt: 'Nike', height: 'h-4' },
		{ src: `${base}/images/logos/a24 logo.png`, alt: 'A24', height: 'h-6' },
		{ src: `${base}/images/logos/shopify.svg`, alt: 'Shopify', height: 'h-5' },
		{ src: `${base}/images/logos/netflix.svg`, alt: 'Netflix', height: 'h-5' },
		{ src: `${base}/images/logos/amazon studios logo.png`, alt: 'Amazon Studios', height: 'h-5' },
		{ src: `${base}/images/logos/samsung.svg`, alt: 'Samsung', height: 'h-4' },
		{ src: `${base}/images/logos/publicis logo.png`, alt: 'Publicis', height: 'h-7' },
		{ src: `${base}/images/logos/paramount.svg`, alt: 'Paramount', height: 'h-6' },
		{ src: `${base}/images/logos/red antler logo.png`, alt: 'Red Antler', height: 'h-5' },
		{ src: `${base}/images/logos/mccann logo.png`, alt: 'McCann', height: 'h-4' },
		{ src: `${base}/images/logos/collins logo.png`, alt: 'Collins', height: 'h-4' },
		{ src: `${base}/images/logos/som logo.png`, alt: 'SOM', height: 'h-4' },
		{ src: `${base}/images/logos/henning larsen logo.png`, alt: 'Henning Larsen', height: 'h-4' },
		{ src: `${base}/images/logos/lego.svg`, alt: 'LEGO', height: 'h-5' },
		{ src: `${base}/images/logos/superside.svg`, alt: 'Superside', height: 'h-4' },
	];

	// TextAlongPath for form border
	const rectPath =
		"M 20,10 L 480,10 A 10,10 0 0,1 490,20 L 490,380 A 10,10 0 0,1 480,390 L 20,390 A 10,10 0 0,1 10,380 L 10,20 A 10,10 0 0,1 20,10";

	onMount(() => {
		mounted = true;
	});

	async function handleSubmit(e: Event) {
		e.preventDefault();
		isSubmitting = true;

		const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSee2ogt7hBGLw979-e6Y5_IQ4ZdbLK1E78lgHiif9Gz7ljlCQ/formResponse';
		const formBody = new URLSearchParams({
			'entry.1266935613': formData.name,
			'entry.1271550787': formData.email,
			'entry.1012494792': `${formData.role} — ${formData.institution}`
		});

		try {
			const iframe = document.createElement('iframe');
			iframe.name = 'hidden_iframe';
			iframe.style.display = 'none';
			document.body.appendChild(iframe);

			const form = document.createElement('form');
			form.method = 'POST';
			form.action = googleFormUrl;
			form.target = 'hidden_iframe';

			for (const [key, value] of formBody.entries()) {
				const input = document.createElement('input');
				input.type = 'hidden';
				input.name = key;
				input.value = value;
				form.appendChild(input);
			}

			document.body.appendChild(form);
			form.submit();

			setTimeout(() => {
				document.body.removeChild(form);
				document.body.removeChild(iframe);
			}, 1000);

			submitSuccess = true;
		} catch (error) {
			console.error('Form submission error:', error);
			submitSuccess = true;
		}

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
	<section class="relative z-10 flex flex-col items-center justify-center px-6 pt-16 pb-8">
		<div class="max-w-2xl mx-auto text-center">
			<p class="text-primary-500 text-xs tracking-[0.2em] uppercase mb-4">
				Krea for Education
			</p>

			<h1 class="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-snug mb-5 text-primary-900 leading-[1.1]">
				The creative AI platform, built for what's next.
			</h1>

			<p class="text-base md:text-lg text-primary-500 mb-6 leading-relaxed max-w-lg mx-auto">
				The same tools used by professionals at Nike, A24, and Microsoft — available for students and classrooms.
			</p>

			<div class="flex items-center justify-center gap-x-2 text-sm md:text-base text-primary-500 mb-8">
				<span class="shrink-0">Learn to</span>
				<TextRotate
					texts={[
						'generate in real time',
						'build visual workflows',
						'train custom styles',
						'create with 55+ models',
						'ship creative work'
					]}
					mainClassName="bg-primary-900 text-white px-3 py-1.5 rounded-lg font-medium"
					splitLevelClassName="overflow-hidden"
					elementLevelClassName="pb-0.5"
					rotationInterval={2500}
					staggerDuration={0.02}
					staggerFrom="first"
				/>
			</div>

			<a
				href="#signup"
				class="register-btn inline-block bg-primary-900 text-white text-base font-medium py-3.5 px-10 rounded-xl transition-all"
			>
				Apply Now
			</a>
		</div>

		<!-- Hero Video Placeholder -->
		<div class="max-w-3xl w-full mx-auto mt-12">
			<div class="hero-video-placeholder relative aspect-video rounded-xl overflow-hidden bg-primary-100 border border-primary-200">
				<!-- Placeholder — swap src for your looping video -->
				<video
					src=""
					muted
					loop
					playsinline
					autoplay
					class="w-full h-full object-cover hidden"
					data-placeholder="hero-video"
				></video>
				<!-- Placeholder state -->
				<div class="absolute inset-0 flex flex-col items-center justify-center gap-3">
					<div class="w-12 h-12 rounded-full bg-primary-200 flex items-center justify-center">
						<Play size={20} class="text-primary-500 ml-0.5" />
					</div>
					<span class="text-xs text-primary-400">Hero video</span>
				</div>
			</div>
		</div>
	</section>

	<!-- Two Paths Section -->
	<section class="relative z-10 px-6 py-12">
		<div class="max-w-3xl mx-auto">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-5">
				<!-- Student Path — Primary -->
				<a href="#signup" class="path-card group rounded-xl p-6 block bg-white border border-primary-200 hover:border-primary-900 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
					<p class="text-xs text-primary-500 tracking-[0.15em] uppercase mb-2">For Students</p>
					<h3 class="text-lg font-semibold text-primary-900 mb-2">Sign up with your .edu</h3>
					<p class="text-sm text-primary-500 leading-relaxed mb-4">
						Apply for access to Krea's full creative AI suite. Build your portfolio with the same tools used in production at top studios and agencies.
					</p>
					<span class="inline-flex items-center gap-1.5 text-xs font-medium text-primary-900 group-hover:gap-2.5 transition-all">
						Apply now <ArrowRight size={12} />
					</span>
				</a>

				<!-- Educator Path — Secondary -->
				<a href="#signup" class="path-card group rounded-xl p-6 block bg-white border border-primary-150 hover:border-primary-400 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
					<p class="text-xs text-primary-400 tracking-[0.15em] uppercase mb-2">For Educators</p>
					<h3 class="text-lg font-semibold text-primary-700 mb-2">Bring Krea to your classroom</h3>
					<p class="text-sm text-primary-500 leading-relaxed mb-4">
						Workshops for your students, team workspaces for your program, and education pricing. We'll tailor it to your curriculum.
					</p>
					<span class="inline-flex items-center gap-1.5 text-xs font-medium text-primary-500 group-hover:text-primary-700 group-hover:gap-2.5 transition-all">
						Get in touch <ArrowRight size={12} />
					</span>
				</a>
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class="relative z-10 py-12 border-y border-primary-200 bg-white">
		<div class="max-w-3xl mx-auto px-6 mb-8">
			<p class="text-xs text-primary-500 tracking-[0.2em] uppercase mb-3">The platform</p>
			<h2 class="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-snug text-primary-900 leading-tight section-heading">
				Every tool. Every model.<br />No limits on learning.
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
					{#each features as feature}
						<div
							class="shrink-0"
							onmouseenter={(e) => { const video = e.currentTarget.querySelector('video'); if (video) video.play(); }}
						>
							<div class="w-48 h-28 rounded-lg overflow-hidden bg-primary-100">
								<video
									src={feature.video}
									muted
									loop
									playsinline
									autoplay
									class="w-full h-full object-cover"
								></video>
							</div>
							<p class="text-[11px] text-primary-500 mt-1.5">{feature.label}</p>
						</div>
					{/each}
				</div>
			</Marquee>
		</div>

		<!-- Capability List -->
		<div class="max-w-3xl mx-auto px-6 mt-10">
			<div class="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-6">
				{#each ['55+ AI models', 'Real-time generation', 'Custom style training', 'Team workspaces', 'Drag-and-drop workflows', 'API access', 'Asset libraries', 'Brand consistency tools'] as item, i}
					<div class="flex items-center gap-2 capability-item" style="animation-delay: {i * 60}ms">
						<Check size={14} class="text-primary-400 shrink-0" />
						<span class="text-xs text-primary-600">{item}</span>
					</div>
				{/each}
			</div>
		</div>

		<!-- Education Content Placeholders -->
		<div class="max-w-3xl mx-auto px-6 mt-10">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
				{#each ['Student work', 'Classroom demo', 'Workshop highlight'] as label}
					<div class="aspect-video rounded-lg border-2 border-dashed border-primary-200 flex items-center justify-center bg-primary-50/50">
						<span class="text-[11px] text-primary-300">{label}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Social Proof — Logo Marquee -->
	<section class="relative z-10 py-8 bg-white overflow-hidden">
		<div class="max-w-5xl mx-auto">
			<p class="text-xs text-primary-400 tracking-[0.15em] uppercase mb-5 text-center">Used professionally at</p>
			<Marquee speed={20} pauseOnHover={true}>
				<div class="flex items-center gap-12 px-4">
					{#each logos as logo}
						<img
							src={logo.src}
							alt={logo.alt}
							class="{logo.height} w-auto grayscale opacity-30 hover:opacity-60 transition-opacity duration-300 shrink-0"
						/>
					{/each}
				</div>
			</Marquee>
		</div>
	</section>

	<!-- Sign Up Form Section -->
	<section id="signup" class="relative z-10 px-6 py-12 bg-primary-50">
		<div class="max-w-md mx-auto relative">
			<!-- TextAlongPath animated border -->
			<div class="absolute inset-0 pointer-events-none">
				<TextAlongPath
					path={rectPath}
					pathId="form-border"
					svgClassName="w-full h-full text-primary-300"
					viewBox="0 0 500 400"
					text="APPLY FOR ACCESS ✦ KREA FOR EDUCATION ✦ APPLY FOR ACCESS ✦ KREA FOR EDUCATION ✦ "
					textClassName="text-[9px] uppercase tracking-[0.3em] font-medium"
					duration={25}
					preserveAspectRatio="none"
					textAnchor="start"
				/>
			</div>

			<!-- Form content -->
			<div class="relative z-10 p-5 md:p-6">
				<div class="text-center mb-5">
					<h2 class="text-2xl font-semibold tracking-snug mb-2 text-primary-900">
						Apply for access
					</h2>
					<p class="text-sm text-primary-500">
						Tell us a bit about yourself and we'll get you set up.
					</p>
				</div>

				{#if submitSuccess}
					<div
						in:scale={{ duration: 400, start: 0.9, easing: cubicOut }}
						class="text-center py-8 bg-white rounded-xl border border-primary-200"
					>
						<div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
							<Check size={24} class="text-primary-600" />
						</div>
						<h3 class="text-base font-medium mb-1 text-primary-900">Application received.</h3>
						<p class="text-xs text-primary-500">We'll be in touch at your email shortly.</p>
					</div>
				{:else}
					<form onsubmit={handleSubmit} class="bg-white rounded-xl border border-primary-200 p-5 space-y-3 shadow-sm">
						<!-- Role Toggle -->
						<div>
							<label class="block text-xs text-primary-700 mb-1.5">I am a...</label>
							<div class="grid grid-cols-2 gap-2">
								<button
									type="button"
									onclick={() => formData.role = 'student'}
									class="py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 border {formData.role === 'student' ? 'bg-primary-900 text-white border-primary-900 shadow-sm' : 'bg-primary-50 text-primary-500 border-primary-200 hover:border-primary-300'}"
								>
									Student
								</button>
								<button
									type="button"
									onclick={() => formData.role = 'educator'}
									class="py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 border {formData.role === 'educator' ? 'bg-primary-900 text-white border-primary-900 shadow-sm' : 'bg-primary-50 text-primary-500 border-primary-200 hover:border-primary-300'}"
								>
									Educator
								</button>
							</div>
						</div>

						<div>
							<label for="name" class="block text-xs text-primary-700 mb-1">Name</label>
							<input
								type="text"
								id="name"
								bind:value={formData.name}
								required
								class="form-input w-full bg-primary-50 border border-primary-200 rounded-lg px-3 py-2.5 text-sm text-primary-900 placeholder:text-primary-400 focus:outline-none focus:border-primary-400 focus:shadow-sm transition-all"
								placeholder="Your name"
							/>
						</div>

						<div>
							<label for="email" class="block text-xs text-primary-700 mb-1">{formData.role === 'student' ? 'School email' : 'Email'}</label>
							<input
								type="email"
								id="email"
								bind:value={formData.email}
								required
								class="form-input w-full bg-primary-50 border border-primary-200 rounded-lg px-3 py-2.5 text-sm text-primary-900 placeholder:text-primary-400 focus:outline-none focus:border-primary-400 focus:shadow-sm transition-all"
								placeholder={formData.role === 'student' ? 'you@university.edu' : 'you@school.edu'}
							/>
						</div>

						<div>
							<label for="institution" class="block text-xs text-primary-700 mb-1">{formData.role === 'student' ? 'School' : 'Institution / Department'}</label>
							<input
								type="text"
								id="institution"
								bind:value={formData.institution}
								required
								class="form-input w-full bg-primary-50 border border-primary-200 rounded-lg px-3 py-2.5 text-sm text-primary-900 placeholder:text-primary-400 focus:outline-none focus:border-primary-400 focus:shadow-sm transition-all"
								placeholder={formData.role === 'student' ? 'Your school or university' : 'University — Design Dept.'}
							/>
						</div>

						<Button type="submit" disabled={isSubmitting} class="w-full" size="md">
							{isSubmitting ? 'Submitting...' : formData.role === 'student' ? 'Apply for Access' : 'Get in Touch'}
						</Button>
					</form>
				{/if}
			</div>
		</div>
	</section>

	<!-- FAQ Section -->
	<section class="relative z-10 px-6 py-12 bg-white">
		<div class="max-w-2xl mx-auto">
			<h2 class="text-lg font-medium tracking-snug mb-6 text-primary-900 section-heading">
				Questions
			</h2>

			<Accordion items={faqItems} />
		</div>
	</section>

	<!-- Footer -->
	<footer class="relative z-10 px-6 py-8 bg-white border-t border-primary-200">
		<div class="max-w-2xl mx-auto flex items-center justify-between">
			<p class="text-[11px] text-primary-500">
				&copy; {new Date().getFullYear()} Krea AI Inc.
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

	/* Staggered fade-in for capability items */
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.capability-item {
		animation: fadeInUp 0.4s ease-out both;
	}

	/* Subtle heading hover — underline draw */
	.section-heading {
		position: relative;
		display: inline-block;
	}
</style>
