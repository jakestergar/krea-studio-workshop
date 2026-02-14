<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import Button from '$lib/components/Button.svelte';
	import TextRotate from '$lib/components/TextRotate.svelte';
	import Marquee from '$lib/components/Marquee.svelte';
	import PixelTrail from '$lib/components/PixelTrail.svelte';
	import { ChevronDown, Check, GraduationCap, Sparkles, Users, Zap } from 'lucide-svelte';

	let mounted = $state(false);

	// FAQ state
	let openFaq = $state<string | null>(null);

	function toggleFaq(id: string) {
		openFaq = openFaq === id ? null : id;
	}

	const faqItems = [
		{
			id: 'cost',
			question: 'Is Krea for Education free?',
			answer: 'Yes. Krea for Education provides free access to our full creative AI suite for verified students and educators at accredited institutions.'
		},
		{
			id: 'eligible',
			question: 'Who is eligible?',
			answer: 'Students, faculty, and staff at accredited K-12 schools, colleges, and universities. You just need a valid .edu email address or proof of enrollment to get started.'
		},
		{
			id: 'includes',
			question: 'What\'s included in the education plan?',
			answer: 'Full access to all Krea tools — Real-Time Generation, Advanced Edit, Krea Nodes, and 55+ AI models. Plus shared team workspaces, custom style training, and priority support for classroom use.'
		},
		{
			id: 'teams',
			question: 'Can I set up Krea for my whole class or department?',
			answer: 'Absolutely. Educators can create team workspaces for their students with shared asset libraries, collaborative projects, and admin controls. We support classes of any size.'
		},
		{
			id: 'commercial',
			question: 'Can students use their work commercially?',
			answer: 'Student work created with Krea for Education belongs to the student. For commercial licensing details, reach out to our education team.'
		}
	];

	// Form state
	let formData = $state({
		name: '',
		email: '',
		institution: '',
		role: ''
	});

	let isSubmitting = $state(false);
	let submitSuccess = $state(false);

	const audienceCards = [
		{
			icon: GraduationCap,
			title: 'Students',
			description: 'Build your portfolio with professional AI creative tools. Free while you\'re enrolled.'
		},
		{
			icon: Users,
			title: 'Educators',
			description: 'Bring AI-native design into your curriculum. Manage classrooms and assignments with shared workspaces.'
		},
		{
			icon: Zap,
			title: 'Institutions',
			description: 'Equip your programs with the creative AI platform used by Nike, Microsoft, and A24.'
		}
	];

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
			'entry.1012494792': formData.institution
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
	<section class="relative z-10 flex flex-col items-center justify-center px-6 pt-16 pb-12">
		<div class="max-w-2xl mx-auto text-center">
			<div class="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 rounded-full px-4 py-1.5 mb-6">
				<Sparkles size={14} class="text-primary-500" />
				<span class="text-xs text-primary-600 font-medium tracking-wide uppercase">Free for students & educators</span>
			</div>

			<h1 class="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-snug mb-5 text-primary-900 leading-[1.1]">
				Krea for Education
			</h1>

			<p class="text-base md:text-lg text-primary-500 mb-6 leading-relaxed max-w-lg mx-auto">
				The AI creative suite used by the world's best teams — now free for classrooms.
			</p>

			<div class="flex items-center justify-center gap-x-2 text-sm md:text-base text-primary-500 mb-8">
				<span class="shrink-0">Help students</span>
				<TextRotate
					texts={[
						'create with AI',
						'build real portfolios',
						'learn faster',
						'think visually',
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
				Get Started Free
			</a>
		</div>
	</section>

	<!-- Audience Section -->
	<section class="relative z-10 px-6 py-12">
		<div class="max-w-3xl mx-auto">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-5">
				{#each audienceCards as card}
					<div class="group border border-primary-200 rounded-xl p-5 hover:border-primary-400 transition-colors">
						<div class="w-9 h-9 bg-primary-50 rounded-lg flex items-center justify-center mb-3">
							<card.icon size={18} class="text-primary-600" />
						</div>
						<h3 class="text-sm font-semibold text-primary-900 mb-1.5">{card.title}</h3>
						<p class="text-xs text-primary-500 leading-relaxed">{card.description}</p>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Features Section -->
	<section class="relative z-10 py-12 border-y border-primary-200 bg-white">
		<div class="max-w-3xl mx-auto px-6 mb-8">
			<p class="text-xs text-primary-500 tracking-[0.2em] uppercase mb-3">What you get</p>
			<h2 class="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-snug text-primary-900 leading-tight">
				Every tool. Every model.<br />No limits on learning.
			</h2>
		</div>

		<!-- Video Marquee -->
		<div class="video-marquee-container">
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
				{#each ['55+ AI models', 'Real-time generation', 'Custom style training', 'Team workspaces', 'Drag-and-drop workflows', 'API access', 'Asset libraries', 'Priority support'] as item}
					<div class="flex items-center gap-2">
						<Check size={14} class="text-primary-400 shrink-0" />
						<span class="text-xs text-primary-600">{item}</span>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Social Proof -->
	<section class="relative z-10 px-6 py-10 bg-white">
		<div class="max-w-3xl mx-auto text-center">
			<p class="text-xs text-primary-400 tracking-[0.15em] uppercase mb-6">Trusted by teams at</p>
			<div class="flex flex-wrap items-center justify-center gap-8 md:gap-10">
				<img src="{base}/images/logos/microsoft.svg" alt="Microsoft" class="h-5 w-auto grayscale opacity-40" />
				<img src="{base}/images/logos/shopify.svg" alt="Shopify" class="h-5 w-auto grayscale opacity-40" />
				<img src="{base}/images/logos/nike.svg" alt="Nike" class="h-4 w-auto grayscale opacity-40" />
				<img src="{base}/images/logos/amazon studios logo.png" alt="Amazon Studios" class="h-5 w-auto grayscale opacity-40" />
				<img src="{base}/images/logos/a24 logo.png" alt="A24" class="h-6 w-auto grayscale opacity-40" />
				<img src="{base}/images/logos/publicis logo.png" alt="Publicis" class="h-7 w-auto grayscale opacity-40" />
			</div>
		</div>
	</section>

	<!-- Sign Up Form Section -->
	<section id="signup" class="relative z-10 px-6 py-12 bg-primary-50">
		<div class="max-w-md mx-auto">
			<div class="text-center mb-6">
				<h2 class="text-2xl font-semibold tracking-snug mb-2 text-primary-900">
					Get started for free
				</h2>
				<p class="text-sm text-primary-500">
					Verify your .edu email and start creating in minutes.
				</p>
			</div>

			{#if submitSuccess}
				<div class="text-center py-8 bg-white rounded-xl border border-primary-200">
					<div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
						<Check size={24} class="text-primary-600" />
					</div>
					<h3 class="text-base font-medium mb-1 text-primary-900">You're on the list.</h3>
					<p class="text-xs text-primary-500">We'll send next steps to your inbox shortly.</p>
				</div>
			{:else}
				<form onsubmit={handleSubmit} class="bg-white rounded-xl border border-primary-200 p-5 space-y-3">
					<div>
						<label for="name" class="block text-xs text-primary-700 mb-1">Name</label>
						<input
							type="text"
							id="name"
							bind:value={formData.name}
							required
							class="w-full bg-primary-50 border border-primary-200 rounded-lg px-3 py-2.5 text-sm text-primary-900 placeholder:text-primary-400 focus:outline-none focus:border-primary-400 transition-colors"
							placeholder="Your name"
						/>
					</div>

					<div>
						<label for="email" class="block text-xs text-primary-700 mb-1">School email</label>
						<input
							type="email"
							id="email"
							bind:value={formData.email}
							required
							class="w-full bg-primary-50 border border-primary-200 rounded-lg px-3 py-2.5 text-sm text-primary-900 placeholder:text-primary-400 focus:outline-none focus:border-primary-400 transition-colors"
							placeholder="you@university.edu"
						/>
					</div>

					<div>
						<label for="institution" class="block text-xs text-primary-700 mb-1">Institution</label>
						<input
							type="text"
							id="institution"
							bind:value={formData.institution}
							required
							class="w-full bg-primary-50 border border-primary-200 rounded-lg px-3 py-2.5 text-sm text-primary-900 placeholder:text-primary-400 focus:outline-none focus:border-primary-400 transition-colors"
							placeholder="School or university name"
						/>
					</div>

					<div>
						<label for="role" class="block text-xs text-primary-700 mb-1">I am a...</label>
						<select
							id="role"
							bind:value={formData.role}
							required
							class="w-full bg-primary-50 border border-primary-200 rounded-lg px-3 py-2.5 text-sm text-primary-900 focus:outline-none focus:border-primary-400 transition-colors appearance-none"
						>
							<option value="" disabled>Select your role</option>
							<option value="student">Student</option>
							<option value="educator">Educator / Professor</option>
							<option value="admin">Department Admin</option>
							<option value="other">Other</option>
						</select>
					</div>

					<Button type="submit" disabled={isSubmitting} class="w-full" size="md">
						{isSubmitting ? 'Submitting...' : 'Apply for Free Access'}
					</Button>
				</form>
			{/if}
		</div>
	</section>

	<!-- FAQ Section -->
	<section class="relative z-10 px-6 py-12 bg-white">
		<div class="max-w-2xl mx-auto">
			<h2 class="text-lg font-medium tracking-snug mb-6 text-primary-900">
				Frequently Asked Questions
			</h2>

			<div class="divide-y divide-primary-200">
				{#each faqItems as item}
					<div class="py-4">
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
								class="text-primary-400 transition-transform duration-200 shrink-0 ml-4 {openFaq === item.id ? 'rotate-180' : ''}"
							/>
						</button>
						<div
							class="overflow-hidden transition-all duration-200 ease-out {openFaq === item.id ? 'max-h-[400px] opacity-100 mt-2' : 'max-h-0 opacity-0'}"
						>
							<p class="text-sm text-primary-500 leading-relaxed">
								{item.answer}
							</p>
						</div>
					</div>
				{/each}
			</div>
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

	select {
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23a3a3a3' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
		background-repeat: no-repeat;
		background-position: right 0.75rem center;
		padding-right: 2.5rem;
	}
</style>
