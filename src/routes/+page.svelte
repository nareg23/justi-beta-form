<script lang="ts">
	import type { PageData } from './$types.js';
	import { superForm } from 'sveltekit-superforms';
	import { formSchema } from '../lib/schema.js';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { m } from '$lib/paraglide/messages';
	import BetaSignupForm from '$lib/components/BetaSignupForm.svelte';
	import LOGO from '$lib/assets/LOGO-PRO-ON-WHITE.svg';
	import { getLocale, setLocale } from '$lib/paraglide/runtime.js';
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

	type FeatureColor = 'schedule' | 'client' | 'profile' | 'availability';

	const features = [
		{
			title: m['features.cards.schedule.title'],
			description: m['features.cards.schedule.description'],
			img: '/images/calendar-schedule.png',
			color: 'schedule' as FeatureColor,
			Icon: CalendarCheck,
			tag: m['features.cards.schedule.tag'],
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
			color: 'client' as FeatureColor,
			Icon: Users,
			tag: m['features.cards.client.tag'],
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
			color: 'profile' as FeatureColor,
			Icon: UserCog,
			tag: m['features.cards.profile.tag'],
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
			color: 'availability' as FeatureColor,
			Icon: Calendar,
			tag: m['features.cards.availability.tag'],
			points: [
				{ Icon: Calendar, text: m['features.cards.availability.one'] },
				{ Icon: FastForward, text: m['features.cards.availability.two'] },
				{ Icon: RefreshCcw, text: m['features.cards.availability.three'] }
			]
		}
	];

	// Color utility maps for feature cards - updated for sophistication
	const colorClasses: Record<string, string> = {
		schedule: 'border-primary/80',
		client: 'border-secondary/80',
		profile: 'border-confirmed',
		availability: 'border-pending'
	};

	const bgClasses: Record<string, string> = {
		schedule: 'bg-primary/5',
		client: 'bg-secondary/5',
		profile: 'bg-accent/30',
		availability: 'bg-pending/5'
	};

	// Coming soon features
	const upcomingFeatures = [
		{
			icon: Laptop,
			title: m['landing.coming_soon.features.profile.title'],
			description: m['landing.coming_soon.features.profile.description']
		},
		{
			icon: Globe,
			title: m['landing.coming_soon.features.leads.title'],
			description: m['landing.coming_soon.features.leads.description']
		},
		{
			icon: MessageSquare,
			title: m['landing.coming_soon.features.client_portal.title'],
			description: m['landing.coming_soon.features.client_portal.description']
		},
		{
			icon: Sparkles,
			title: m['landing.coming_soon.features.ai_assistant.title'],
			description: m['landing.coming_soon.features.ai_assistant.description']
		},
		{
			icon: CalendarCheck,
			title: m['landing.coming_soon.features.scheduling.title'],
			description: m['landing.coming_soon.features.scheduling.description']
		},
		{
			icon: Scale,
			title: m['landing.coming_soon.features.case_management.title'],
			description: m['landing.coming_soon.features.case_management.description']
		}
	];
</script>

<!-- More sophisticated gradient background -->
<div class="relative min-h-screen bg-gradient-to-b from-[#f8faff] via-[#fcfdff] to-white">
	<!-- Language Selector -->
	<div
		class="absolute top-6 right-6 z-50 flex items-center gap-2 rounded-full bg-white/80 px-2 py-1.5 shadow-sm backdrop-blur-sm"
	>
		<button
			type="button"
			onclick={() => setLocale('fr')}
			class={`text-primary/80 hover:text-primary hover:bg-primary/5 relative cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-300 ${
				getLocale() === 'fr' ? 'bg-primary/10 text-primary' : ''
			}`}
		>
			FR
		</button>
		<div class="h-4 w-px bg-gray-200"></div>
		<button
			type="button"
			onclick={() => setLocale('en')}
			class={`text-primary/80 hover:text-primary hover:bg-primary/5 relative cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-300 ${
				getLocale() === 'en' ? 'bg-primary/10 text-primary' : ''
			}`}
		>
			EN
		</button>
	</div>

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
					<span class="text-sm font-medium">{m['landing.trust.security']()}</span>
				</div>
				<div class="hidden h-4 w-px bg-slate-200 md:block"></div>
				<div class="flex items-center gap-2">
					<Scale class="text-primary/70 h-5 w-5" />
					<span class="text-sm font-medium">{m['landing.trust.innovation']()}</span>
				</div>
			</div>

			<!-- Title and description with enhanced typography -->
			<div class="relative">
				<h1 class="relative z-10 text-4xl font-extrabold sm:text-5xl lg:text-7xl">
					<span
						class="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 bg-clip-text text-transparent"
					>
						{m['landing.hero.title']()}
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
				{m['landing.hero.subtitle']()}
			</p>

			<!-- CTA section with enhanced design -->
			<div class="flex flex-col items-center gap-6">
				<a
					href="#signup-form"
					class="group bg-primary/95 hover:bg-primary/90 inline-flex items-center gap-3 rounded-full px-8 py-4 text-lg font-semibold text-white shadow-md transition-all duration-300 ease-in-out hover:translate-y-[-2px] hover:shadow-lg"
				>
					<span>{m['landing.hero.cta']()}</span>
					<ArrowRight class="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
				</a>

				<!-- Trust badge -->
				<div
					class="flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-sm text-slate-600"
				>
					<Sparkles class="text-primary/70 h-4 w-4" />
					<span>{m['landing.hero.trust_badge']()}</span>
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
						{feature.tag()}
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
						>{m['landing.coming_soon.badge']()}</span
					>
				</div>
				<h2 class="mb-4 text-3xl font-bold text-slate-800">{m['landing.coming_soon.title']()}</h2>
				<p class="mx-auto max-w-2xl text-slate-600">
					{m['landing.coming_soon.subtitle']()}
				</p>
			</div>

			<div class="mt-24">
				<div class="mx-auto mt-16 max-w-7xl px-6 lg:px-8">
					<div
						class="mx-auto grid max-w-2xl grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
					>
						{#each upcomingFeatures as feature}
							<div
								class="flex flex-col items-center rounded-3xl bg-white px-8 py-10 shadow-lg ring-1 ring-gray-200"
							>
								<feature.icon class="text-primary/70 h-6 w-6" />
								<h3 class="mt-6 text-base leading-7 font-semibold tracking-tight text-gray-900">
									{feature.title()}
								</h3>
								<p class="mt-2 text-sm leading-6 text-gray-600">{feature.description()}</p>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<div class="mt-16 text-center">
				<div
					class="bg-primary/5 text-primary/80 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
				>
					<Clock class="h-4 w-4" />
					<span>{m['landing.coming_soon.early_access']()}</span>
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
					{m['landing.beta.title']()}
				</h2>
				<p class="text-lg leading-relaxed text-slate-600">
					{m['landing.beta.subtitle']()}
				</p>
			</div>

			<BetaSignupForm {form} {formData} {enhance} {locationsAndSpecializations} />

			<div class="mt-8 space-y-4">
				<div class="flex items-center justify-between text-sm">
					<div class="flex items-center gap-2 text-gray-500">
						<span>{m['form.footer.contact.question']()}</span>
						<a
							href="mailto:support@justiconnect.com"
							class="text-primary/80 hover:text-primary inline-flex items-center gap-1.5 font-medium transition-colors duration-200"
						>
							{m['form.footer.contact.email']()}
						</a>
					</div>
					<div class="flex items-center gap-1.5 text-gray-400">
						{m['form.footer.madeIn']()}
					</div>
				</div>
				<div class="flex items-center text-sm text-gray-400">
					<p>{m['form.footer.copyright']({ year: new Date().getFullYear() })}</p>
				</div>
			</div>
		</div>
	</main>
</div>
