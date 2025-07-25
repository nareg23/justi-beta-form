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
	import { Clock, Users, BadgeCheck, Star, Zap, Shield, Rocket } from 'lucide-svelte';
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

<div class="bg-background relative min-h-screen">
	<!-- Background gradient overlay -->
	<div
		class="from-primary/2 via-background to-muted/3 pointer-events-none absolute inset-0 bg-gradient-to-br"
	></div>

	<!-- Decorative floating elements -->
	<div
		class="from-primary/4 to-muted/4 animate-pulse-primary absolute top-20 left-10 h-32 w-32 rounded-full bg-gradient-to-br blur-xl"
	></div>
	<div
		class="from-muted/6 to-primary/6 animate-pulse-secondary absolute top-40 right-20 h-24 w-24 rounded-full bg-gradient-to-br blur-lg"
	></div>
	<div
		class="from-muted/4 to-primary/4 animate-float absolute bottom-40 left-20 h-40 w-40 rounded-full bg-gradient-to-br blur-2xl"
	></div>

	<div class="relative z-10">
		<div class="bg-foreground text-background">
			<div class="container px-4 py-2">
				<div
					class="flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:justify-between"
				>
					<div
						class="flex flex-wrap items-center justify-center gap-2 text-xs sm:flex-1 sm:gap-3 sm:text-sm"
					>
						<div class="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 sm:gap-2">
							<Clock class="text-secondary h-3 w-3 animate-pulse" />
							<span class="font-medium">{m['landing.urgency.limitedAccess']()}</span>
						</div>
						<span class="text-primary-foreground/60 hidden sm:inline">•</span>
						<span class="bg-secondary/20 rounded-full px-3 py-1 text-center"
							>{m['landing.urgency.spotsAvailable']()}</span
						>
						<span class="text-primary-foreground/60 hidden sm:inline">•</span>
						<span class="bg-accent/80 text-accent-foreground rounded-full px-3 py-1 font-medium"
							>{m['landing.urgency.applyNow']()}</span
						>
					</div>

					<!-- Language Switcher -->
					<div
						class="flex items-center gap-0.5 rounded-lg border border-white/30 bg-white/20 text-xs backdrop-blur-sm"
					>
						<button
							type="button"
							onclick={() => setLocale('fr')}
							class={`cursor-pointer rounded-l-lg px-2 py-1 font-medium transition-all duration-300 sm:px-3 sm:py-1.5 ${
								getLocale() === 'fr'
									? 'text-foreground scale-105 bg-white shadow-lg'
									: 'text-background hover:scale-105 hover:bg-white/20'
							}`}
						>
							FR
						</button>
						<button
							type="button"
							onclick={() => setLocale('en')}
							class={`cursor-pointer rounded-r-lg px-2 py-1 font-medium transition-all duration-300 sm:px-3 sm:py-1.5 ${
								getLocale() === 'en'
									? 'text-foreground scale-105 bg-white shadow-lg'
									: 'text-background hover:scale-105 hover:bg-white/20'
							}`}
						>
							EN
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- Header - Enhanced with gradient -->
		<header
			class="from-card to-card/80 border-primary/20 border-b bg-gradient-to-b py-6 backdrop-blur-sm sm:py-8"
		>
			<div class="container px-4">
				<div class="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
					<div class="relative">
						<img src={LOGO} alt="JustiConnect" class="h-6 drop-shadow-lg sm:h-8" />
						<div
							class="from-primary/20 to-secondary/20 absolute -inset-2 -z-10 rounded-full bg-gradient-to-r blur-lg"
						></div>
					</div>
					<div class="text-center">
						<h1 class="text-foreground text-xl font-bold sm:text-2xl">
							{m['landing.header.title']()}
						</h1>
						<p class="text-muted-foreground text-xs sm:text-sm">{m['landing.header.subtitle']()}</p>
					</div>
				</div>
			</div>
		</header>

		<!-- Main Content - Enhanced with better visual hierarchy -->
		<main class="relative py-8">
			<div class="container">
				<div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-start">
					<!-- Left Column: Value Proposition -->
					<div class="space-y-6">
						<!-- Hero Message - Enhanced -->
						<div class="relative space-y-3">
							<div
								class="from-primary/3 to-muted/3 absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-r blur-2xl"
							></div>
							<h2 class="text-foreground text-3xl leading-tight font-bold">
								{m['landing.hero.title']()}
							</h2>
							<p class="text-muted-foreground text-lg">
								{m['landing.hero.subtitle']()}
							</p>
						</div>

						<!-- Key Benefits - Enhanced with colors -->
						<div
							class="bg-card/50 border-primary/20 shadow-glow space-y-3 rounded-xl border p-6 backdrop-blur-sm"
						>
							<div class="mb-4 flex items-center gap-3">
								<div class="bg-primary h-1 w-8 rounded-full"></div>
								<Zap class="text-primary h-5 w-5" />
								<span class="text-primary text-sm font-medium">{m['landing.benefits.title']()}</span
								>
							</div>
							<div class="space-y-4">
								<div
									class="from-primary/5 border-primary flex items-start gap-4 rounded-lg border-l-2 bg-gradient-to-r to-transparent p-3"
								>
									<div class="from-primary to-primary-strong rounded-lg bg-gradient-to-br p-2">
										<BadgeCheck class="text-primary-foreground h-4 w-4" />
									</div>
									<div class="space-y-1">
										<h3 class="text-foreground text-sm font-semibold">
											{m['landing.benefits.qualified.title']()}
										</h3>
										<p class="text-muted-foreground text-xs">
											{m['landing.benefits.qualified.description']()}
										</p>
									</div>
								</div>
								<div
									class="from-secondary/5 border-secondary flex items-start gap-4 rounded-lg border-l-2 bg-gradient-to-r to-transparent p-3"
								>
									<div class="from-secondary to-secondary-strong rounded-lg bg-gradient-to-br p-2">
										<Star class="text-secondary-foreground h-4 w-4" />
									</div>
									<div class="space-y-1">
										<h3 class="text-foreground text-sm font-semibold">
											{m['landing.benefits.freeBeta.title']()}
										</h3>
										<p class="text-muted-foreground text-xs">
											{m['landing.benefits.freeBeta.description']()}
										</p>
									</div>
								</div>
								<div
									class="from-accent/5 border-accent flex items-start gap-4 rounded-lg border-l-2 bg-gradient-to-r to-transparent p-3"
								>
									<div class="from-accent to-accent/80 rounded-lg bg-gradient-to-br p-2">
										<Shield class="text-accent-foreground h-4 w-4" />
									</div>
									<div class="space-y-1">
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

						<!-- Early Adopter Benefits - Enhanced -->
						<div
							class="bg-primary/5 border-primary/30 shadow-glow rounded-xl border p-6 backdrop-blur-sm"
						>
							<div class="mb-4 flex items-center gap-3">
								<div class="bg-primary h-1 w-8 rounded-full"></div>
								<Rocket class="text-primary h-5 w-5" />
								<h4 class="text-primary text-sm font-medium">
									{m['landing.earlyAdopter.title']()}
								</h4>
							</div>
							<div class="space-y-3">
								<div class="flex items-center gap-3 rounded-lg bg-white/50 p-2 backdrop-blur-sm">
									<div class="bg-primary/20 rounded-full p-1">
										<BadgeCheck class="text-primary h-4 w-4" />
									</div>
									<span class="text-foreground text-sm font-medium"
										>{m['landing.earlyAdopter.freeAccess']()}</span
									>
								</div>
								<div class="flex items-center gap-3 rounded-lg bg-white/50 p-2 backdrop-blur-sm">
									<div class="bg-secondary/20 rounded-full p-1">
										<Star class="text-secondary h-4 w-4" />
									</div>
									<span class="text-foreground text-sm font-medium"
										>{m['landing.earlyAdopter.exclusiveDiscount']()}</span
									>
								</div>
								<div class="flex items-center gap-3 rounded-lg bg-white/50 p-2 backdrop-blur-sm">
									<div class="bg-accent/30 rounded-full p-1">
										<Users class="text-accent-foreground h-4 w-4" />
									</div>
									<span class="text-foreground text-sm font-medium"
										>{m['landing.earlyAdopter.prioritySupport']()}</span
									>
								</div>
							</div>
						</div>

						<!-- How It Works - Enhanced -->
						<div
							class="from-card via-card to-accent/5 border-accent/20 shadow-glow space-y-4 rounded-xl border bg-gradient-to-br p-6 backdrop-blur-sm"
						>
							<div class="mb-4 flex items-center gap-3">
								<div class="from-primary to-accent h-1 w-8 rounded-full bg-gradient-to-r"></div>
								<h4 class="text-primary text-sm font-medium">{m['landing.howItWorks.title']()}</h4>
							</div>
							<div class="space-y-4">
								<div
									class="from-primary/5 flex items-center gap-4 rounded-lg bg-gradient-to-r to-transparent p-3"
								>
									<div
										class="from-primary to-primary-strong text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold shadow-lg"
									>
										1
									</div>
									<span class="text-muted-foreground text-sm"
										>{m['landing.howItWorks.step1']()}</span
									>
								</div>
								<div
									class="from-secondary/5 flex items-center gap-4 rounded-lg bg-gradient-to-r to-transparent p-3"
								>
									<div
										class="from-secondary to-secondary-strong text-secondary-foreground flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold shadow-lg"
									>
										2
									</div>
									<span class="text-muted-foreground text-sm"
										>{m['landing.howItWorks.step2']()}</span
									>
								</div>
								<div
									class="from-accent/5 flex items-center gap-4 rounded-lg bg-gradient-to-r to-transparent p-3"
								>
									<div
										class="from-accent to-accent/80 text-accent-foreground flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br text-sm font-bold shadow-lg"
									>
										3
									</div>
									<span class="text-muted-foreground text-sm"
										>{m['landing.howItWorks.step3']()}</span
									>
								</div>
							</div>
						</div>

						<!-- Testimonial - Enhanced -->
						<div
							class="from-secondary/10 via-card to-secondary/5 border-secondary/20 shadow-glow-secondary rounded-xl border bg-gradient-to-br p-6 backdrop-blur-sm"
						>
							<div class="space-y-4">
								<p class="text-muted-foreground relative text-sm leading-relaxed italic">
									<span class="text-secondary absolute -top-2 -left-2 text-2xl">"</span>
									{m['landing.testimonial.quote']()}
									<span class="text-secondary text-2xl">"</span>
								</p>
								<div class="flex items-center gap-3">
									<div
										class="from-secondary/30 to-secondary/50 border-secondary/30 flex h-10 w-10 items-center justify-center rounded-full border bg-gradient-to-br"
									>
										<span class="text-secondary-strong text-sm font-bold">SC</span>
									</div>
									<p class="text-foreground text-sm font-medium">
										{m['landing.testimonial.author']()}
									</p>
								</div>
							</div>
						</div>

						<!-- FAQ Section - Enhanced -->
						<div
							class="from-card via-card to-muted/20 border-muted/30 shadow-glow space-y-4 rounded-xl border bg-gradient-to-br p-6 backdrop-blur-sm"
						>
							<h2 class="text-foreground text-xl font-bold">
								{m['landing.faq.title']()}
							</h2>
							<Accordion.Root type="single" class="w-full" value="3">
								{#each FAQ as item (item.id)}
									<Accordion.Item value={item.id} class="border-primary/10 border-b py-2">
										<Accordion.Trigger
											class="hover:text-primary py-2 text-[15px] leading-6 transition-colors hover:no-underline"
										>
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

					<!-- Right Column: Signup Form - Enhanced -->
					<div class="sticky top-4 h-fit space-y-6 self-start">
						<!-- Beta Access Card - Enhanced -->
						<div
							class="from-card via-card to-primary/5 border-primary/50 shadow-glow relative overflow-hidden rounded-xl border-2 bg-gradient-to-br p-6 backdrop-blur-sm"
						>
							<!-- Decorative gradient overlay -->
							<div
								class="from-primary/20 absolute top-0 right-0 h-32 w-32 rounded-full bg-gradient-to-bl to-transparent blur-2xl"
							></div>
							<div
								class="from-secondary/20 absolute bottom-0 left-0 h-24 w-24 rounded-full bg-gradient-to-tr to-transparent blur-xl"
							></div>

							<div class=" z-10">
								<div class="mb-6 text-center">
									<div class="mb-3 flex items-center justify-center gap-2">
										<div class="bg-primary h-1 w-8 rounded-full"></div>
										<Star class="text-primary h-5 w-5 animate-pulse" />
										<div class="bg-primary h-1 w-8 rounded-full"></div>
									</div>
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
			</div>
		</main>

		<!-- Footer - Enhanced -->
		<footer
			class="from-muted/40 via-muted/30 to-muted/40 border-primary/20 border-t bg-gradient-to-r py-6 backdrop-blur-sm"
		>
			<div class="container px-4">
				<div
					class="text-muted-foreground flex flex-col items-center gap-4 text-center text-xs sm:flex-row sm:justify-between sm:text-left"
				>
					<div class="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
						<span class="bg-card/50 rounded-full px-3 py-1 backdrop-blur-sm"
							>{m['form.footer.contact.question']()}</span
						>
						<a
							href="mailto:support@justiconnect.com"
							class="text-foreground hover:text-primary bg-primary/10 hover:bg-primary/20 rounded-full px-3 py-1 font-medium transition-all duration-300 hover:scale-105"
						>
							{m['form.footer.contact.email']()}
						</a>
					</div>
					<div class="bg-card/50 rounded-full px-3 py-1 text-center backdrop-blur-sm sm:text-right">
						{m['form.footer.copyright']({ year: new Date().getFullYear() })}
					</div>
				</div>
			</div>
		</footer>
	</div>
</div>
