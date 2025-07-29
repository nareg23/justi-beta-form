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
	import {
		Clock,
		BadgeCheck,
		Star,
		Zap,
		Shield,
		Rocket,
		Headset,
		UsersRound,
		Pocket
	} from 'lucide-svelte';
	import * as Accordion from '$lib/components/ui/accordion';
	import { FAQ } from '$lib/consts/faq';

	let { data }: { data: PageData } = $props();

	const { locationsAndSpecializations } = data;

	const form = superForm(data.form, {
		validators: zodClient(formSchema),
		multipleSubmits: 'prevent',
		delayMs: 1000
	});

	const heroImage =
		'https://media.istockphoto.com/id/1478282808/photo/law-legal-technology-concept-legal-advice-online-internet-law-law-and-justice-concept.jpg?s=2048x2048&w=is&k=20&c=W6jk1S8_4KqXyqrk9QmNv6vRIeXkZmB_QP_LCRcWvbY=';
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
		<div class="text-background bg-gray-800">
			<div class="container py-2">
				<div
					class="flex flex-col items-center gap-2 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 to-purple-600 sm:flex-row sm:items-center sm:justify-between"
				>
					<div
						class="flex flex-wrap items-center justify-center gap-2 text-xs sm:flex-1 sm:gap-3 sm:text-sm"
					>
						<div
							class="bg-primary/30 border-primary/40 flex items-center gap-1 rounded-full border px-3 py-1 sm:gap-2"
						>
							<Clock class="text-primary h-3 w-3 animate-pulse" />
							<span class="font-medium">{m['landing.urgency.limitedAccess']()}</span>
						</div>
						<span class="text-primary-foreground/60 hidden sm:inline">•</span>
						<span
							class="bg-secondary/30 border-secondary/50 flex items-center gap-2 rounded-full border px-3 py-1 text-center"
						>
							<UsersRound class="text-secondary size-3" />
							{m['landing.urgency.spotsAvailable']()}
						</span>
						<span class="text-primary-foreground/60 hidden sm:inline">•</span>
						<span
							class="bg-confirmed/70 border-confirmed text-card flex items-center gap-2 rounded-full border px-3 py-1 font-medium"
						>
							<Rocket class="text-confirmed size-3" />
							{m['landing.urgency.applyNow']()}
						</span>
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

		<!-- Header - Sleek and organized -->
		<header
			class="from-card/95 to-card/90 border-primary/15 border-b bg-gradient-to-b backdrop-blur-md transition-all duration-300"
		>
			<div class="container mx-auto px-4">
				<div class="flex h-16 items-center justify-between">
					<!-- Logo Section -->
					<div class="flex items-center gap-3">
						<div class="relative">
							<img
								src={LOGO}
								alt="JustiConnect"
								class="h-7 drop-shadow-sm transition-all duration-300 hover:scale-105 sm:h-8"
							/>
							<div
								class="from-primary/10 to-secondary/10 absolute -inset-1 -z-10 rounded-full bg-gradient-to-r opacity-0 blur-sm transition-opacity duration-300 hover:opacity-100"
							></div>
						</div>
						<div class="border-muted-foreground/20 hidden border-l pl-3 sm:block">
							<h1 class="text-lg font-bold tracking-tight">Beta</h1>
						</div>
					</div>

					<!-- Center Title (visible on mobile) -->
					<div class="sm:hidden">
						<h1 class="text-foreground text-base font-semibold">
							{m['landing.header.title']()}
						</h1>
					</div>

					<!-- Beta Badge & Subtitle -->
					<div class="flex items-center gap-4">
						<div class="hidden text-right lg:block">
							<p class="text-foreground text-sm leading-tight font-semibold">
								{m['landing.header.subtitle']()}
							</p>
						</div>
						<div
							class="bg-primary/10 border-primary/30 text-primary hover:bg-primary/15 flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-all duration-300"
						>
							<div class="bg-primary h-1.5 w-1.5 animate-pulse rounded-full"></div>
							{m['landing.beta.title']()}
						</div>
					</div>
				</div>
			</div>
		</header>

		<!-- Main Content - Enhanced with better visual hierarchy -->
		<main class="relative py-8">
			<div class="container">
				<div class="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_450px] lg:items-start">
					<!-- Left Column: Value Proposition -->
					<div class="space-y-6">
						<!-- Hero Media Section -->
						<div class="relative">
							<div
								class="from-primary/5 via-card to-secondary/5 border-primary/30 shadow-glow overflow-hidden rounded-xl border bg-gradient-to-br backdrop-blur-sm"
							>
								<!-- Image Container -->
								<div class="relative aspect-video">
									<!-- Placeholder for hero image - replace src with your actual image -->
									<img
										src={heroImage}
										alt={m['landing.hero.title']()}
										class="h-full w-full object-cover"
										loading="lazy"
									/>

									<!-- Video container for future use - initially hidden -->
									<!-- 
									<video
										class="h-full w-full object-cover"
										controls
										poster="/hero-image.jpg"
									>
										<source src="/hero-video.mp4" type="video/mp4" />
										Your browser does not support the video tag.
									</video>
									-->

									<!-- Gradient overlay for better text readability -->
									<div
										class="from-primary/20 to-secondary/20 absolute inset-0 bg-gradient-to-r via-transparent"
									></div>

									<!-- Optional overlay content -->
									<div class="absolute inset-0 flex items-end p-6">
										<div
											class="bg-primary/20 text-primary-foreground rounded-lg px-4 py-2 backdrop-blur-sm"
										>
											<p class="text-sm font-medium">
												{m['landing.hero.mediaCaption']?.() ||
													'Transform your legal practice with JustiConnect'}
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

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

						<!-- Early Adopter Benefits - Enhanced -->
						<div
							class="bg-primary/2 border-primary/20 shadow-glow rounded-xl border p-6 backdrop-blur-sm"
						>
							<div class="mb-4 flex items-center gap-3">
								<div class="bg-primary h-1 w-8 rounded-full"></div>
								<Rocket class="text-primary h-5 w-5" />
								<h4 class="text-primary text-sm font-medium">
									{m['landing.earlyAdopter.title']()}
								</h4>
							</div>
							<div class="flex w-full flex-col items-center justify-around gap-3 md:flex-row">
								<div
									class="border-primary/20 flex w-full items-center gap-3 rounded-lg border bg-white/50 p-3 backdrop-blur-sm"
								>
									<div class="bg-primary/20 border-primary/20 rounded-full border p-1.5">
										<BadgeCheck class="text-primary size-4" />
									</div>
									<span class="text-foreground text-sm font-medium"
										>{m['landing.earlyAdopter.freeAccess']()}</span
									>
								</div>
								<div
									class="border-secondary/20 flex w-full items-center gap-3 rounded-lg border bg-white/50 p-3 backdrop-blur-sm"
								>
									<div class="bg-secondary/20 border-secondary/20 rounded-full border p-1.5">
										<Star class="text-secondary size-4 " />
									</div>
									<span class="text-foreground text-sm font-medium"
										>{m['landing.earlyAdopter.exclusiveDiscount']()}</span
									>
								</div>
								<div
									class="border-accent/80 flex w-full items-center gap-3 rounded-lg border bg-white/50 p-3 backdrop-blur-sm"
								>
									<div class="bg-confirmed/10 border-confirmed rounded-full border p-1.5">
										<Headset class="text-confirmed size-4" />
									</div>
									<span class="text-foreground text-sm font-medium"
										>{m['landing.earlyAdopter.prioritySupport']()}</span
									>
								</div>
							</div>
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
									class="from-confirmed/5 border-confirmed flex items-start gap-4 rounded-lg border-l-2 bg-gradient-to-r to-transparent p-3"
								>
									<div
										class="from-confirmed to-confirmed-foreground/60 rounded-lg bg-gradient-to-br p-2"
									>
										<Shield class="text-card h-4 w-4" />
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

						<!-- How It Works - Enhanced -->
						<div
							class="from-card via-card to-accent/5 border-accent shadow-glow relative overflow-hidden rounded-xl border bg-gradient-to-br p-6 backdrop-blur-sm"
						>
							<!-- Background decoration -->
							<div
								class="from-primary/5 to-accent/5 absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-bl blur-3xl"
							></div>

							<div class="relative z-10 space-y-6">
								<div class="text-left">
									<div class="mb-3 flex items-center gap-2">
										<div
											class="from-primary to-accent h-1 w-12 rounded-full bg-gradient-to-r"
										></div>
										<h4 class="text-foreground text-lg font-bold">
											{m['landing.howItWorks.title']()}
										</h4>
									</div>
									<p class="text-muted-foreground text-sm">{m['landing.howItWorks.subtitle']()}</p>
								</div>

								<!-- Horizontal Steps Layout -->
								<div class="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-6">
									<div class="flex-1">
										<div
											class="bg-card/80 border-primary/30 shadow-glow flex h-full flex-col items-center gap-3 rounded-xl border p-4 text-center backdrop-blur-sm lg:p-6"
										>
											<div
												class="from-primary to-primary-strong shadow-glow-primary flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br text-xl font-bold text-white"
											>
												1
											</div>
											<span class="text-foreground text-sm leading-relaxed font-semibold"
												>{m['landing.howItWorks.step1']()}</span
											>
										</div>
									</div>

									<!-- Arrow between steps on desktop -->
									<div class="hidden items-center justify-center lg:flex">
										<div class="from-primary to-secondary h-0.5 w-8 bg-gradient-to-r"></div>
										<div
											class="from-primary to-secondary ml-1 h-2 w-2 rotate-45 bg-gradient-to-br"
										></div>
									</div>

									<div class="flex-1">
										<div
											class="bg-card/80 border-secondary/30 shadow-glow flex h-full flex-col items-center gap-3 rounded-xl border p-4 text-center backdrop-blur-sm lg:p-6"
										>
											<div
												class="from-secondary to-secondary-strong shadow-glow-secondary flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br text-xl font-bold text-white"
											>
												2
											</div>
											<span class="text-foreground text-sm leading-relaxed font-semibold"
												>{m['landing.howItWorks.step2']()}</span
											>
										</div>
									</div>

									<!-- Arrow between steps on desktop -->
									<div class="hidden items-center justify-center lg:flex">
										<div class="from-secondary to-accent h-0.5 w-8 bg-gradient-to-r"></div>
										<div
											class="from-secondary to-accent ml-1 h-2 w-2 rotate-45 bg-gradient-to-br"
										></div>
									</div>

									<div class="flex-1">
										<div
											class="bg-card/80 border-confirmed/30 shadow-glow flex h-full flex-col items-center gap-3 rounded-xl border p-4 text-center backdrop-blur-sm lg:p-6"
										>
											<div
												class="shadow-glow from-confirmed to-confirmed-foreground/60 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br text-xl font-bold text-white"
											>
												3
											</div>
											<span class="text-foreground text-sm leading-relaxed font-semibold"
												>{m['landing.howItWorks.step3']()}</span
											>
										</div>
									</div>
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
									<h3 class="text-foreground mb-2 text-xl font-bold">
										{m['landing.signupCard.title']()}
									</h3>
									<p class="text-muted-foreground text-sm">
										{m['landing.signupCard.subtitle']()}
									</p>
								</div>

								<!-- Progress Bar -->

								<div
									class="from-primary/10 via-secondary/4 to-secondary/4 shadow-glow mb-6 rounded-lg border bg-gradient-to-br p-[1px]"
								>
									<div class=" rounded-lg p-4 backdrop-blur-sm">
										<div class="mb-3 flex items-center justify-between text-xs">
											<span class="text-card-foreground/80 font-medium"
												>{m['landing.urgency.progressLabel']()}</span
											>
											<span class="text-card-foreground font-bold">32/200</span>
										</div>
										<div
											class="bg-card-foreground/10 border-card-foreground/20 relative h-3 overflow-hidden rounded-full border shadow-inner"
										>
											<!-- Progress fill with glow effect -->
											<div
												class="relative h-full rounded-full bg-green-500 shadow-lg shadow-green-500/50 transition-all duration-1000 ease-out"
												style="width: 16%"
											>
												<div
													class="absolute inset-0 animate-pulse rounded-full bg-gradient-to-b from-white/40 to-transparent"
												></div>
											</div>
											<!-- Subtle animated shimmer -->
											<div
												class="absolute inset-y-0 -left-full w-full animate-pulse bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50"
											></div>
										</div>
										<p
											class="text-card-foreground/90 mt-2 animate-pulse text-center text-xs font-medium"
										>
											{m['landing.urgency.fastFilling']()}
										</p>
									</div>
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
