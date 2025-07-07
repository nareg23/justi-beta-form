<script lang="ts">
	import type { PageData } from './$types.js';
	import { superForm } from 'sveltekit-superforms';
	import { formSchema } from '../lib/schema.js';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { m } from '$lib/paraglide/messages';
	import BetaSignupForm from '$lib/components/BetaSignupForm.svelte';
	import LOGO from '$lib/assets/LOGO-PRO-ON-WHITE.svg';
	import {
		CalendarCheck,
		Clock,
		Users,
		Database,
		LineChart,
		BadgeCheck,
		Star,
		Calendar,
		FastForward,
		RefreshCcw,
		UserPlus,
		UserCog,
		Sparkles,
		Laptop,
		Globe,
		MessageSquare,
		ArrowRight,
		Shield,
		Scale
	} from 'lucide-svelte';

	let { data }: { data: PageData } = $props();

	const { locationsAndSpecializations } = data;

	const form = superForm(data.form, {
		validators: zodClient(formSchema)
	});
	const { form: formData, enhance } = form;

	const referralSources = ['Google', 'LinkedIn', 'Colleague', 'Event', 'Other'];

	let showNdaModal = $state(false);

	const features = [
		{
			title: m['features.cards.schedule.title'],
			description: m['features.cards.schedule.description'],
			img: '/images/calendar-schedule.png',
			color: 'confirmed',
			Icon: CalendarCheck,
			tag: 'Smart Scheduling',
			points: [
				{ Icon: CalendarCheck, text: m['features.cards.schedule.one'] },
				{ Icon: Clock, text: m['features.cards.schedule.two'] },
				{ Icon: Users, text: m['features.cards.schedule.three'] }
			]
		},
		{
			title: m['features.cards.client.title'],
			description: m['features.cards.client.description'],
			img: '/images/clients.png',
			color: 'secondary',
			Icon: Users,
			tag: 'Client Relations',
			points: [
				{ Icon: UserPlus, text: m['features.cards.client.one'] },
				{ Icon: Database, text: m['features.cards.client.two'] },
				{ Icon: LineChart, text: m['features.cards.client.three'] }
			]
		},
		{
			title: m['features.cards.profile.title'],
			description: m['features.cards.profile.description'],
			img: '/images/profile-screen.png',
			color: 'accent',
			Icon: UserCog,
			tag: 'Professional Profile',
			points: [
				{ Icon: UserCog, text: m['features.cards.profile.one'] },
				{ Icon: BadgeCheck, text: m['features.cards.profile.two'] },
				{ Icon: Star, text: m['features.cards.profile.three'] }
			]
		},
		{
			title: m['features.cards.availability.title'],
			description: m['features.cards.availability.description'],
			img: '/images/availability-screen.png',
			color: 'pending',
			Icon: Calendar,
			tag: 'Availability Control',
			points: [
				{ Icon: Calendar, text: m['features.cards.availability.one'] },
				{ Icon: FastForward, text: m['features.cards.availability.two'] },
				{ Icon: RefreshCcw, text: m['features.cards.availability.three'] }
			]
		}
	];

	// Color utility maps for feature cards - updated for sophistication
	const colorClasses: Record<string, string> = {
		confirmed: 'border-primary/80',
		secondary: 'border-secondary/80',
		accent: 'border-primary/70',
		pending: 'border-primary/60'
	};

	const bgClasses: Record<string, string> = {
		confirmed: 'bg-primary/5',
		secondary: 'bg-secondary/5',
		accent: 'bg-primary/5',
		pending: 'bg-primary/5'
	};

	// Coming soon features
	const upcomingFeatures = [
		{
			icon: Laptop,
			title: 'Desktop App',
			description: 'Native application for Windows & Mac'
		},
		{
			icon: Globe,
			title: 'Global Network',
			description: 'International legal professional directory'
		},
		{
			icon: MessageSquare,
			title: 'Client Portal',
			description: 'Secure client communication hub'
		},
		{
			icon: Sparkles,
			title: 'AI Assistant',
			description: 'Smart scheduling & document analysis'
		}
	];
</script>

<!-- More sophisticated gradient background -->
<div class="relative min-h-screen bg-gradient-to-b from-[#f8faff] via-[#fcfdff] to-white">
	<!-- Decorative background elements -->
	<div class="absolute inset-0 overflow-hidden">
		<div class="bg-primary/[0.02] absolute -top-4 -right-4 h-64 w-64 rounded-full blur-3xl"></div>
		<div
			class="bg-secondary/[0.02] absolute top-1/4 -left-12 h-96 w-96 rounded-full blur-3xl"
		></div>
		<div class="bg-primary/[0.01] absolute top-1/3 right-1/4 h-48 w-48 rounded-full blur-2xl"></div>
	</div>

	<!-- Hero Section with refined colors -->
	<header
		class="relative container mx-auto flex flex-col items-center px-6 py-24 text-center lg:py-32"
	>
		<!-- Logo with subtle animation -->
		<div class="group relative flex h-fit max-w-lg items-center justify-center">
			<div
				class="absolute inset-0 -z-10 scale-110 rounded-full bg-white/50 opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100"
			></div>
			<img
				src={LOGO}
				alt="JustiConnect Logo"
				class="h-full w-full transition-transform duration-700 group-hover:scale-[1.02]"
			/>
		</div>

		<!-- Main content with enhanced spacing -->
		<div class="relative mt-16 space-y-8">
			<!-- Trust indicators -->
			<div class="flex items-center justify-center gap-8 text-slate-600">
				<div class="flex items-center gap-2">
					<Shield class="text-primary/70 h-5 w-5" />
					<span class="text-sm font-medium">Bank-Grade Security</span>
				</div>
				<div class="hidden h-4 w-px bg-slate-200 md:block"></div>
				<div class="flex items-center gap-2">
					<Scale class="text-primary/70 h-5 w-5" />
					<span class="text-sm font-medium">Legal Tech Innovation</span>
				</div>
			</div>

			<!-- Title and description with enhanced typography -->
			<div class="relative">
				<h1 class="relative z-10 text-4xl font-extrabold sm:text-5xl lg:text-7xl">
					<span
						class="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 bg-clip-text text-transparent"
					>
						Elevate Your Legal Practice
					</span>
				</h1>
				<!-- Subtle highlight effect -->
				<div class="pointer-events-none absolute inset-0 -z-10">
					<div
						class="from-primary/[0.02] via-secondary/[0.02] to-primary/[0.02] h-full w-full bg-gradient-to-r blur-3xl"
					></div>
				</div>
				<div
					class="bg-primary/[0.03] absolute top-0 -right-4 h-20 w-20 rounded-full blur-2xl"
				></div>
				<div
					class="bg-secondary/[0.03] absolute bottom-0 -left-8 h-24 w-24 rounded-full blur-2xl"
				></div>
			</div>

			<p class="mx-auto max-w-2xl text-lg leading-relaxed font-medium text-slate-600 sm:text-xl">
				Join an exclusive network of forward-thinking legal professionals shaping the future of
				client engagement
			</p>

			<!-- CTA section with enhanced design -->
			<div class="flex flex-col items-center gap-6">
				<a
					href="#signup-form"
					class="group bg-primary/95 hover:bg-primary/90 inline-flex items-center gap-3 rounded-full px-8 py-4 text-lg font-semibold text-white shadow-md transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:shadow-lg"
				>
					<span>Get Early Access</span>
					<ArrowRight class="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
				</a>

				<!-- Trust badge -->
				<div
					class="flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-sm text-slate-600"
				>
					<Sparkles class="text-primary/70 h-4 w-4" />
					<span>Trusted by Leading Law Firms</span>
				</div>
			</div>
		</div>
	</header>

	<!-- Feature Cards Section with refined styling -->
	<section class="container mx-auto px-6 py-16">
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
			{#each features as feature}
				<div
					class={`group relative rounded-2xl border bg-white/70 p-8 shadow-md backdrop-blur-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg ${colorClasses[feature.color]} hover:border-t-4`}
				>
					<div
						class={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl ${bgClasses[feature.color]} transition-transform duration-300 group-hover:scale-110`}
					>
						<feature.Icon class="text-primary/80 text-3xl" />
					</div>
					<div class="text-primary/90 mb-3 text-sm font-semibold tracking-wider uppercase">
						{feature.tag}
					</div>
					<div class="mb-3 text-xl font-bold text-slate-800">{feature.title()}</div>
					<div class="mb-6 text-base leading-relaxed text-slate-600">{feature.description()}</div>
					<ul class="space-y-4 text-sm text-slate-700">
						{#each feature.points as point}
							<li
								class="flex items-start gap-3 transition-transform duration-200 group-hover:translate-x-1"
							>
								<point.Icon class="text-primary/70 mt-0.5 flex-shrink-0 text-lg" />
								<span class="leading-tight">{point.text()}</span>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</section>

	<!-- Coming Soon Section -->
	<section class="relative container mx-auto px-6 py-24">
		<div
			class="via-primary/5 absolute inset-0 bg-gradient-to-b from-transparent to-transparent"
		></div>
		<div class="relative">
			<div class="mb-16 text-center">
				<div class="mb-4 flex items-center justify-center gap-2">
					<Sparkles class="text-primary/70 h-6 w-6" />
					<span class="text-primary/80 text-sm font-semibold tracking-wider uppercase"
						>Coming Soon</span
					>
				</div>
				<h2 class="mb-4 text-3xl font-bold text-slate-800">The Future of Legal Practice</h2>
				<p class="mx-auto max-w-2xl text-slate-600">
					We're building the next generation of legal technology. Here's a preview of what's coming
					next.
				</p>
			</div>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
				{#each upcomingFeatures as feature}
					<div class="group relative">
						<div
							class="from-primary/[0.03] absolute inset-0 rounded-2xl bg-gradient-to-b to-transparent"
						></div>
						<div
							class="relative rounded-2xl bg-white/50 p-6 text-center backdrop-blur-sm transition-transform duration-300 hover:translate-y-[-2px]"
						>
							<div
								class="bg-primary/5 mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
							>
								<feature.icon class="text-primary/70 h-6 w-6" />
							</div>
							<h3 class="mb-2 font-semibold text-slate-800">{feature.title}</h3>
							<p class="text-sm text-slate-600">{feature.description}</p>
						</div>
					</div>
				{/each}
			</div>

			<div class="mt-16 text-center">
				<div
					class="bg-primary/5 text-primary/80 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
				>
					<Clock class="h-4 w-4" />
					<span>Early Access Coming Q2 2024</span>
				</div>
			</div>
		</div>
	</section>

	<!-- Beta Signup Form Card with refined styling -->
	<main
		id="signup-form"
		class="container mx-auto flex flex-1 flex-col items-center justify-center px-6 py-24"
	>
		<div
			class="w-full max-w-5xl rounded-2xl bg-white/80 p-12 shadow-xl backdrop-blur-md transition-all duration-300 ease-in-out hover:shadow-2xl"
		>
			<div class="mx-auto mb-12 max-w-2xl text-center">
				<h2 class="mb-4 text-4xl leading-tight font-bold text-slate-800">
					Join the JustiConnect Beta
				</h2>
				<p class="text-lg leading-relaxed text-slate-600">
					Connect with forward-thinking lawyers. Shape the future of legal technology.
				</p>
			</div>
			<BetaSignupForm {form} {formData} {showNdaModal} {enhance} {locationsAndSpecializations} />
		</div>
	</main>
</div>

<!-- NDA Modal with refined styling -->
{#if showNdaModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-6 backdrop-blur-sm"
		role="dialog"
		aria-modal="true"
	>
		<div class="relative w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl">
			<button
				class="absolute top-4 right-4 text-slate-400 transition-colors duration-200 hover:text-slate-600"
				onclick={() => (showNdaModal = false)}
				aria-label="Close">✕</button
			>
			<h2 class="mb-6 text-2xl font-bold text-slate-800">NDA & Beta Terms</h2>
			<div class="prose prose-slate prose-sm max-h-[60vh] overflow-y-auto">
				<p>
					By participating in the JustiConnect Beta Program, you agree to maintain the
					confidentiality of all information shared during the beta testing period...
				</p>
				<!-- Add more terms content here -->
			</div>
			<button
				class="bg-primary/95 hover:bg-primary/90 transition-smooth mt-6 w-full rounded-xl py-3 font-semibold text-white hover:translate-y-[-1px] hover:shadow-lg"
				onclick={() => (showNdaModal = false)}>Close</button
			>
		</div>
	</div>
{/if}
