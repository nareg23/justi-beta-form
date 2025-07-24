<script lang="ts">
	import { PUBLIC_CAPTCHA_SITE_KEY } from '$env/static/public';
	import type { PageData } from './$types.js';
	import { superForm } from 'sveltekit-superforms';
	import { formSchema } from '../lib/schema.js';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { m } from '$lib/paraglide/messages';
	import BetaSignupForm from '$lib/components/BetaSignupForm.svelte';
	import LOGO from '$lib/assets/LOGO-PRO-ON-WHITE.svg';
	import { getLocale, setLocale } from '$lib/paraglide/runtime.js';
	import { Clock, Users, BadgeCheck, Star } from 'lucide-svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import { FAQ } from '$lib/consts/faq';

	let { data }: { data: PageData } = $props();

	const { locationsAndSpecializations } = data;

	const form = superForm(data.form, {
		validators: zodClient(formSchema),
		multipleSubmits: 'prevent',
		resetForm: false,
		delayMs: 1000
	});
</script>

<svelte:head>
	<script
		src="https://www.google.com/recaptcha/api.js?render={PUBLIC_CAPTCHA_SITE_KEY}"
		async
		defer
	></script>
</svelte:head>

<div class="bg-background min-h-screen">
	<div class="bg-foreground text-background">
		<div class="container px-4 py-2">
			<div class="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-between">
				<div
					class="flex flex-wrap items-center justify-center gap-2 text-xs sm:flex-1 sm:gap-3 sm:text-sm"
				>
					<div class="flex items-center gap-1 sm:gap-2">
						<Clock class="h-3 w-3" />
						<span class="font-medium">{m['landing.urgency.limitedAccess']()}</span>
					</div>
					<span class="text-muted hidden sm:inline">•</span>
					<span class="text-center">{m['landing.urgency.spotsAvailable']()}</span>
					<span class="text-muted hidden sm:inline">•</span>
					<span class="font-medium">{m['landing.urgency.applyNow']()}</span>
				</div>

				<!-- Language Switcher -->
				<div
					class="bg-background/20 border-background/30 flex items-center gap-0.5 rounded-lg border text-xs"
				>
					<button
						type="button"
						onclick={() => setLocale('fr')}
						class={`cursor-pointer rounded-l-lg px-2 py-1 font-medium transition-colors sm:px-3 sm:py-1.5 ${
							getLocale() === 'fr'
								? 'bg-card text-foreground'
								: 'text-background hover:bg-background/50'
						}`}
					>
						FR
					</button>
					<button
						type="button"
						onclick={() => setLocale('en')}
						class={`cursor-pointer rounded-r-lg px-2 py-1 font-medium transition-colors sm:px-3 sm:py-1.5 ${
							getLocale() === 'en'
								? 'bg-background text-foreground'
								: 'text-background hover:bg-background/50'
						}`}
					>
						EN
					</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Header - Compact logo and title -->
	<header class="bg-card border-b py-6 sm:py-8">
		<div class="container px-4">
			<div class="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
				<img src={LOGO} alt="JustiConnect" class="h-6 sm:h-8" />
				<div class="text-center">
					<h1 class="text-foreground text-xl font-bold sm:text-2xl">
						{m['landing.header.title']()}
					</h1>
					<p class="text-muted-foreground text-xs sm:text-sm">{m['landing.header.subtitle']()}</p>
				</div>
			</div>
		</div>
	</header>

	<!-- Main Content - Two column layout for efficiency -->
	<main class="py-8">
		<div class="container">
			<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
				<!-- Left Column: Value Proposition -->
				<div class="space-y-6">
					<!-- Hero Message -->
					<div class="space-y-3">
						<h2 class="text-foreground text-3xl leading-tight font-bold">
							{m['landing.hero.title']()}
						</h2>
						<p class="text-muted-foreground text-lg">
							{m['landing.hero.subtitle']()}
						</p>
					</div>

					<!-- Key Benefits -->
					<div class="bg-card/50 space-y-3 rounded-lg border p-4">
						<div class="mb-2 flex items-center gap-2">
							<div class="bg-primary h-1 w-6 rounded-full"></div>
							<span class="text-primary text-sm font-medium">{m['landing.benefits.title']()}</span>
						</div>
						<div class="space-y-3">
							<div class="flex items-start gap-3">
								<div class="bg-primary mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"></div>
								<div class="space-y-0.5">
									<h3 class="text-sm font-semibold">{m['landing.benefits.qualified.title']()}</h3>
									<p class="text-muted-foreground text-xs">
										{m['landing.benefits.qualified.description']()}
									</p>
								</div>
							</div>
							<div class="flex items-start gap-3">
								<div class="bg-primary mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"></div>
								<div class="space-y-0.5">
									<h3 class="text-sm font-semibold">{m['landing.benefits.freeBeta.title']()}</h3>
									<p class="text-muted-foreground text-xs">
										{m['landing.benefits.freeBeta.description']()}
									</p>
								</div>
							</div>
							<div class="flex items-start gap-3">
								<div class="bg-primary mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full"></div>
								<div class="space-y-0.5">
									<h3 class="text-foreground text-sm font-semibold">
										{m['landing.benefits.management.title']()}
									</h3>
									<p class="text-muted-foreground text-xs">
										{m['landing.benefits.management.description']()}
									</p>
								</div>
							</div>
						</div>
					</div>

					<!-- Early Adopter Benefits -->
					<div class="bg-primary/5 rounded-lg border p-4">
						<div class="mb-3 flex items-center gap-2">
							<div class="bg-primary h-1 w-6 rounded-full"></div>
							<h4 class="text-primary text-sm font-medium">{m['landing.earlyAdopter.title']()}</h4>
						</div>
						<div class="space-y-2">
							<div class="flex items-center gap-2">
								<BadgeCheck class="text-primary h-4 w-4" />
								<span class="text-foreground text-sm font-medium"
									>{m['landing.earlyAdopter.freeAccess']()}</span
								>
							</div>
							<div class="flex items-center gap-2">
								<Star class="text-primary h-4 w-4" />
								<span class="text-foreground text-sm font-medium"
									>{m['landing.earlyAdopter.exclusiveDiscount']()}</span
								>
							</div>
							<div class="flex items-center gap-2">
								<Users class="text-primary h-4 w-4" />
								<span class="text-foreground text-sm font-medium"
									>{m['landing.earlyAdopter.prioritySupport']()}</span
								>
							</div>
						</div>
					</div>

					<!-- How It Works -->
					<div class="bg-card/50 space-y-3 rounded-lg border p-4">
						<div class="mb-2 flex items-center gap-2">
							<div class="bg-primary h-1 w-6 rounded-full"></div>
							<h4 class="text-primary text-sm font-medium">{m['landing.howItWorks.title']()}</h4>
						</div>
						<div class="space-y-2">
							<div class="flex items-center gap-3">
								<div
									class="bg-foreground text-background flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium"
								>
									1
								</div>
								<span class="text-muted-foreground text-sm">{m['landing.howItWorks.step1']()}</span>
							</div>
							<div class="flex items-center gap-3">
								<div
									class="bg-foreground text-background flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium"
								>
									2
								</div>
								<span class="text-muted-foreground text-sm">{m['landing.howItWorks.step2']()}</span>
							</div>
							<div class="flex items-center gap-3">
								<div
									class="bg-foreground text-background flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium"
								>
									3
								</div>
								<span class="text-muted-foreground text-sm">{m['landing.howItWorks.step3']()}</span>
							</div>
						</div>
					</div>
					<!-- Testimonial -->
					<div class="bg-secondary/5 rounded-lg border p-4">
						<div class="space-y-2">
							<p class="text-muted-foreground text-sm leading-relaxed italic">
								"{m['landing.testimonial.quote']()}"
							</p>
							<div class="flex items-center gap-2">
								<div class="bg-secondary/20 flex h-6 w-6 items-center justify-center rounded-full">
									<span class="text-secondary text-xs font-medium">SC</span>
								</div>
								<p class="text-foreground text-xs font-medium">
									{m['landing.testimonial.author']()}
								</p>
							</div>
						</div>
					</div>
					<div class="space-y-4">
						<h2 class="text-xl font-bold">{m['landing.faq.title']()}</h2>
						<Accordion.Root type="single" class="w-full" value="3">
							{#each FAQ as item (item.id)}
								<Accordion.Item value={item.id} class="py-2">
									<Accordion.Trigger class="py-2 text-[15px] leading-6 hover:no-underline">
										{item.title}
									</Accordion.Trigger>
									<Accordion.Content class="text-muted-foreground pb-2">
										{item.content}
									</Accordion.Content>
								</Accordion.Item>
							{/each}
						</Accordion.Root>
					</div>
				</div>

				<!-- Right Column: Signup Form -->
				<div class="sticky top-4 h-fit space-y-6">
					<!-- Beta Access Card -->
					<div class="bg-card border-primary/50 rounded-lg border p-6">
						<div class="mb-4 text-center">
							<h3 class="text-foreground mb-2 text-xl font-bold">
								{m['landing.signupCard.title']()}
							</h3>
							<p class="text-muted-foreground text-sm">
								{m['landing.signupCard.subtitle']()}
							</p>
						</div>

						<BetaSignupForm {form} {locationsAndSpecializations} />
					</div>
				</div>
			</div>
		</div>
	</main>

	<!-- Footer - Minimal -->
	<footer class="bg-muted/30 border-t py-4">
		<div class="container px-4">
			<div
				class="text-muted-foreground flex flex-col items-center gap-3 text-center text-xs sm:flex-row sm:justify-between sm:text-left"
			>
				<div class="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
					<span>{m['form.footer.contact.question']()}</span>
					<a
						href="mailto:support@justiconnect.com"
						class="text-foreground hover:text-primary font-medium"
					>
						{m['form.footer.contact.email']()}
					</a>
				</div>
				<div class="text-center sm:text-right">
					{m['form.footer.copyright']({ year: new Date().getFullYear() })}
				</div>
			</div>
		</div>
	</footer>
</div>
