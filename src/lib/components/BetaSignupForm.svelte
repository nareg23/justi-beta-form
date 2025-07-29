<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { PUBLIC_CAPTCHA_SITE_KEY } from '$env/static/public';
	import { X, Loader2, CheckCircle2, AlertCircle } from 'lucide-svelte';
	import type { Database } from '$lib/types/supabase';
	import Badge from './ui/badge/badge.svelte';
	import { cn } from '$lib/utils';
	import Button from './ui/button/button.svelte';
	import { ArrowRight } from 'lucide-svelte';
	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	import NdaDialog from './nda-dialog.svelte';
	import type { SuperForm } from 'sveltekit-superforms';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { Confetti } from 'svelte-confetti';
	interface Props {
		form: SuperForm<
			{
				specializations: string[];
				email: string;
				firstName: string;
				lastName: string;
				phone: string;
				province: string;
				city: string;
				agreeBeta: true;
				otherSpecialization?: string | undefined;
				captchaToken: string;
			},
			any
		>;
		locationsAndSpecializations: {
			locations: {
				provinces: Database['public']['Tables']['location']['Row'][];
				cities: Database['public']['Tables']['location']['Row'][];
			};
			specializations: Database['public']['Tables']['specialization']['Row'][];
		};
	}

	let { form, locationsAndSpecializations }: Props = $props();

	const { message, form: formData, enhance, submitting, submit, delayed } = form;

	const {
		locations: { cities, provinces },
		specializations
	} = locationsAndSpecializations;

	const inputClasses =
		'w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary';
	const labelClasses = 'text-sm font-medium text-foreground';

	const isEnglish = getLocale() === 'en';
	let showNdaModal = $state(false);

	const triggeredSpecializations = $derived.by(() => {
		if ($formData?.specializations?.length === 0) {
			return [];
		}

		const other = {
			id: 'other',
			label: 'Other',
			fr_label: 'Autre',
			value: 'other'
		};

		return $formData.specializations?.map((specialization: string) => {
			return [...specializations, other].find((s) => s.value === specialization);
		});
	});
	const triggeredProvince = $derived.by(() => {
		if ($formData?.province) {
			return provinces.find((p) => p.value === $formData.province);
		}
		return {
			id: '',
			label: 'Select province',
			fr_label: 'Sélectionnez la province',
			value: ''
		};
	});
	const cityOptions = $derived.by(() => {
		return cities.filter((city) => city.parent_id === triggeredProvince?.id) || [];
	});

	const triggeredCity = $derived.by(() => {
		if ($formData?.city) {
			return cities.find((c) => c.value === $formData.city);
		}
		return {
			label: 'Select city',
			fr_label: 'Sélectionnez la ville',
			value: '',
			id: ''
		};
	});

	const otherSpecialization = $derived.by(() => {
		return !!triggeredSpecializations?.find((s) => s?.value === 'other') || false;
	});

	const generateCaptchaToken = async () => {
		try {
			await new Promise<void>((resolve) => {
				window.grecaptcha.ready(() => resolve());
			});

			const token = await window.grecaptcha.execute(PUBLIC_CAPTCHA_SITE_KEY, {
				action: 'register'
			});

			$formData.captchaToken = token;
		} catch (error) {
			return ($message = { text: m['form.errors.captchaToken.required'](), type: 'error' });
		}
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		await generateCaptchaToken();
		submit();
	};
</script>

<div class="relative">
	{#if $submitting || $delayed}
		<div
			class="bg-background absolute inset-0 z-50 flex items-center justify-center rounded backdrop-blur-sm"
		>
			<div class="flex flex-col items-center gap-2">
				<Loader2 class="text-primary h-6 w-6 animate-spin" />
				<p class="text-muted-foreground text-sm font-medium">{m['form.submitting']()}</p>
			</div>
		</div>
	{/if}

	{#if $message}
		{#if $message.type === 'success'}
			<div class="flex h-full min-h-[50px] w-full items-center justify-center">
				<Confetti x={[-0.5, 0.5]} />
				<Confetti amount={10} x={[-0.75, -0.3]} y={[0.15, 0.75]} />
				<Confetti amount={10} x={[0.3, 0.75]} y={[0.15, 0.75]} />
			</div>
		{/if}
		<div class="mb-4">
			<div
				class={cn(
					'flex items-start gap-2 rounded-md border p-3 text-sm',
					$message.type === 'error' && 'border-destructive bg-destructive/5 text-destructive',
					$message.type === 'success' && 'border-green-500 bg-green-600/5 text-green-700'
				)}
			>
				{#if $message.type === 'error'}
					<AlertCircle class="h-4 w-4 flex-shrink-0" />
				{:else}
					<CheckCircle2 class="h-4 w-4 flex-shrink-0" />
				{/if}
				<p class="font-medium">{$message.text}</p>
			</div>
		</div>
	{/if}
	{#if !$message || $message.type !== 'success'}
		<form method="POST" use:enhance class="space-y-4">
			<input type="hidden" name="captchaToken" bind:value={$formData.captchaToken} />

			<div class="grid gap-4 md:grid-cols-2">
				<Form.Field {form} name="firstName">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label class={labelClasses}>
								{m['form.sections.personal.firstName.label']()}
							</Form.Label>
							<Input {...props} class={inputClasses} bind:value={$formData.firstName} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors class="text-destructive mt-1 text-xs" />
				</Form.Field>

				<Form.Field {form} name="lastName">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label class={labelClasses}>
								{m['form.sections.personal.lastName.label']()}
							</Form.Label>
							<Input {...props} class={inputClasses} bind:value={$formData.lastName} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors class="text-destructive mt-1 text-xs" />
				</Form.Field>
			</div>

			<div class="grid gap-4 md:grid-cols-2">
				<Form.Field {form} name="email">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label class={labelClasses}>
								{m['form.sections.personal.email.label']()}
							</Form.Label>
							<Input type="email" {...props} class={inputClasses} bind:value={$formData.email} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors class="text-destructive mt-1 text-xs" />
				</Form.Field>

				<Form.Field {form} name="phone">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label class={labelClasses}>
								{m['form.sections.personal.phone.label']()}
							</Form.Label>
							<Input type="tel" {...props} class={inputClasses} bind:value={$formData.phone} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors class="text-destructive mt-1 text-xs" />
				</Form.Field>
			</div>

			<div class="grid gap-4 md:grid-cols-2">
				<Form.Field {form} name="province">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label class={labelClasses}>
								{m['form.sections.professional.province.label']()}
							</Form.Label>
							<Select.Root
								type="single"
								{...props}
								bind:value={$formData.province}
								onValueChange={() => ($formData.city = '')}
							>
								<Select.Trigger class={inputClasses}>
									{#snippet children()}
										{#if isEnglish}
											{triggeredProvince?.label}
										{:else}
											{triggeredProvince?.fr_label}
										{/if}
									{/snippet}
								</Select.Trigger>
								<Select.Content class="bg-background rounded-md border shadow-lg">
									<Select.Group>
										{#each provinces as province}
											<Select.Item
												value={province.value}
												class="hover:bg-muted cursor-pointer px-3 py-2 text-sm"
											>
												{#if isEnglish}
													{province.label}
												{:else}
													{province.fr_label}
												{/if}
											</Select.Item>
										{/each}
									</Select.Group>
								</Select.Content>
							</Select.Root>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors class="text-destructive mt-1 text-xs" />
				</Form.Field>

				<Form.Field {form} name="city">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label class={labelClasses}>
								{m['form.sections.professional.city.label']()}
							</Form.Label>
							<Select.Root
								{...props}
								type="single"
								bind:value={$formData.city}
								disabled={!triggeredProvince?.id}
							>
								<Select.Trigger class={cn(inputClasses, !triggeredProvince?.id && 'opacity-50')}>
									{#snippet children()}
										{#if isEnglish}
											{triggeredCity?.label}
										{:else}
											{triggeredCity?.fr_label}
										{/if}
									{/snippet}
								</Select.Trigger>
								<Select.Content class="bg-background rounded-md border shadow-lg">
									<Select.Group>
										{#each cityOptions as city}
											<Select.Item
												value={city.value}
												class="hover:bg-muted cursor-pointer px-3 py-2 text-sm"
											>
												{#if isEnglish}
													{city.label}
												{:else}
													{city.fr_label}
												{/if}
											</Select.Item>
										{/each}
									</Select.Group>
								</Select.Content>
							</Select.Root>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors class="text-destructive mt-1 text-xs" />
				</Form.Field>
			</div>

			<Form.Field {form} name="specializations">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label class={labelClasses}>
							{m['form.sections.professional.specializations.label']()}
						</Form.Label>
						<Select.Root {...props} type="multiple" bind:value={$formData.specializations}>
							<Select.Trigger
								class={cn(
									inputClasses,
									'flex !h-auto min-h-[2.5rem] flex-wrap items-center gap-1',
									$formData.specializations?.length > 0 ? 'justify-start' : 'justify-center'
								)}
							>
								{#snippet children()}
									{#each triggeredSpecializations as specialization}
										<Badge
											class="bg-primary/10 text-primary hover:bg-primary/15 px-2 py-0.5 text-xs"
										>
											{#if isEnglish}
												{specialization?.label}
											{:else}
												{specialization?.fr_label}
											{/if}
											<button
												type="button"
												class="text-primary/70 hover:text-primary ml-1"
												onclick={() => {
													$formData.specializations = $formData.specializations.filter(
														(s: string) => s !== specialization?.value
													);
												}}
											>
												<X size={10} />
											</button>
										</Badge>
									{:else}
										<span class="text-muted-foreground text-sm">
											{m['form.sections.professional.specializations.placeholder']()}
										</span>
									{/each}
								{/snippet}
							</Select.Trigger>
							<Select.Content class="bg-background rounded-md border shadow-lg">
								<Select.Group>
									{#each specializations as specialization}
										<Select.Item
											value={specialization.value}
											class="hover:bg-muted cursor-pointer px-3 py-2 text-sm"
										>
											{#if isEnglish}
												{specialization.label}
											{:else}
												{specialization.fr_label}
											{/if}
										</Select.Item>
									{/each}
									<Select.Item
										value="other"
										class="hover:bg-muted cursor-pointer px-3 py-2 text-sm"
									>
										{#if isEnglish}
											Other
										{:else}
											Autre
										{/if}
									</Select.Item>
								</Select.Group>
							</Select.Content>
						</Select.Root>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors class="text-destructive mt-1 text-xs" />
			</Form.Field>

			{#if otherSpecialization}
				<Form.Field {form} name="otherSpecialization">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label class={labelClasses}>
								{m['form.sections.professional.otherSpecialization.label']()}
							</Form.Label>
							<Input
								{...props}
								class={inputClasses}
								bind:value={$formData.otherSpecialization}
								placeholder={m['form.sections.professional.otherSpecialization.placeholder']()}
							/>
						{/snippet}
					</Form.Control>
					<Form.FieldErrors class="text-destructive mt-1 text-xs" />
				</Form.Field>
			{/if}

			<Form.Field {form} name="agreeBeta">
				<Form.Control>
					{#snippet children({ props })}
						<div class="flex items-start gap-3">
							<Checkbox
								{...props}
								class="border-input text-primary focus:ring-primary mt-0.5 h-4 w-4 rounded  focus:ring-1"
								bind:checked={$formData.agreeBeta}
								required
							/>
							<button
								type="button"
								class="text-foreground hover:text-primary text-sm underline underline-offset-2"
								onclick={() => (showNdaModal = true)}
							>
								{m['form.sections.additional.agreeBeta.label']()}
							</button>
						</div>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors class="text-destructive mt-1 text-xs" />
			</Form.Field>

			<div class="relative">
				<!-- Gradient border container -->
				<div
					class="from-primary via-primary-strong to-primary shadow-primary/50 rounded-xl bg-gradient-to-r p-[2px] shadow-2xl"
				>
					<Button
						onclick={handleSubmit}
						disabled={$submitting}
						class={cn(
							'relative w-full py-6 text-lg font-bold',
							'from-primary to-primary-strong text-primary-foreground bg-gradient-to-r',
							'transition-all duration-300 ease-out',
							'hover:shadow-primary/60 hover:scale-[1.02] hover:shadow-2xl',
							'active:scale-[0.98]',
							'flex items-center justify-center gap-3',
							'overflow-hidden rounded-xl',
							$submitting
								? 'cursor-not-allowed opacity-70'
								: 'hover:from-primary-strong hover:to-primary transform'
						)}
					>
						<!-- Animated shimmer overlay -->
						{#if !$submitting}
							<div
								class="animate-shimmer absolute inset-0 -top-1 -left-full h-full w-1/2 skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
							></div>
						{/if}

						<div class="relative z-10 flex items-center justify-center gap-3">
							{#if $submitting}
								<Loader2 class="h-5 w-5 animate-spin" />
								<span class="font-bold">{m['form.submitting']()}</span>
							{:else}
								<span class="font-bold tracking-wide">{m['form.submit']()}</span>
								<div
									class="bg-primary-foreground/20 flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1"
								>
									<ArrowRight class="h-4 w-4" />
								</div>
							{/if}
						</div>
					</Button>
				</div>

				<!-- Pulsing glow effect -->
				{#if !$submitting}
					<div class="absolute inset-0 -z-10 animate-pulse">
						<div
							class="from-primary/20 to-primary-strong/20 absolute inset-0 rounded-xl bg-gradient-to-r blur-xl"
						></div>
					</div>
				{/if}
			</div>
		</form>
	{/if}
</div>

<NdaDialog
	bind:showNdaModal
	handleClick={() => ((showNdaModal = false), ($formData.agreeBeta = true), console.log($formData))}
/>

<style>
	@keyframes shimmer {
		0% {
			transform: translateX(-100%) skewX(-12deg);
		}
		100% {
			transform: translateX(300%) skewX(-12deg);
		}
	}

	.animate-shimmer {
		animation: shimmer 2s infinite;
	}
</style>
