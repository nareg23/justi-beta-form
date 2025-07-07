<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { referralSources } from '$lib/schema.js';
	import { UserCircle, Briefcase, Info, X } from 'lucide-svelte';
	import type { Database } from '$lib/types/supabase';
	import Badge from './ui/badge/badge.svelte';
	import { cn } from '$lib/utils';
	import Button from './ui/button/button.svelte';
	import { ArrowRight } from 'lucide-svelte';
	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	import NdaDialog from './nda-dialog.svelte';

	interface Props {
		form: any;
		formData: any;
		enhance: any;
		locationsAndSpecializations: {
			locations: {
				provinces: Database['public']['Tables']['location']['Row'][];
				cities: Database['public']['Tables']['location']['Row'][];
			};
			specializations: Database['public']['Tables']['specialization']['Row'][];
		};
	}

	let { form, formData, enhance, locationsAndSpecializations }: Props = $props();

	const {
		locations: { cities, provinces },
		specializations
	} = locationsAndSpecializations;

	const inputClasses =
		'w-full rounded-lg border border-gray-200 bg-white/50 px-4 py-3 text-base transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20';
	const labelClasses = 'text-sm font-medium text-gray-700 mb-1.5';
	const descriptionClasses = 'mt-1.5 text-sm text-gray-500';

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
			label: 'Select your province',
			fr_label: 'Sélectionnez votre province',
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
			label: 'Select your city',
			fr_label: 'Sélectionnez votre ville',
			value: '',
			id: ''
		};
	});

	const otherSpecialization = $derived.by(() => {
		return (
			!!triggeredSpecializations?.find(
				(s: Props['locationsAndSpecializations']['specializations'][0]) => s.value === 'other'
			) || false
		);
	});
</script>

<form method="POST" use:enhance class="space-y-12">
	<!-- Personal Information -->
	<div class="space-y-8">
		<div class="flex items-center gap-3 border-b border-gray-200 pb-4">
			<UserCircle class="text-primary h-6 w-6" />
			<h2 class="text-2xl font-semibold">{m['form.sections.personal.title']()}</h2>
		</div>
		<div class="grid gap-8 md:grid-cols-2">
			<Form.Field {form} name="firstName">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label class={labelClasses}
							>{m['form.sections.personal.firstName.label']()}</Form.Label
						>
						<Input {...props} class={inputClasses} bind:value={$formData.firstName} />
					{/snippet}
				</Form.Control>
				<Form.Description class={descriptionClasses}
					>{m['form.sections.personal.firstName.description']()}</Form.Description
				>
				<Form.FieldErrors class="mt-2 text-sm text-red-500" />
			</Form.Field>

			<Form.Field {form} name="lastName">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label class={labelClasses}
							>{m['form.sections.personal.lastName.label']()}</Form.Label
						>
						<Input {...props} class={inputClasses} bind:value={$formData.lastName} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors class="mt-2 text-sm text-red-500" />
			</Form.Field>
		</div>

		<div class="grid gap-8 md:grid-cols-2">
			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label class={labelClasses}>{m['form.sections.personal.email.label']()}</Form.Label
						>
						<Input type="email" {...props} class={inputClasses} bind:value={$formData.email} />
					{/snippet}
				</Form.Control>
				<Form.Description class={descriptionClasses}
					>{m['form.sections.personal.email.description']()}</Form.Description
				>
				<Form.FieldErrors class="mt-2 text-sm text-red-500" />
			</Form.Field>

			<Form.Field {form} name="phone">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label class={labelClasses}>{m['form.sections.personal.phone.label']()}</Form.Label
						>
						<Input type="tel" {...props} class={inputClasses} bind:value={$formData.phone} />
					{/snippet}
				</Form.Control>
				<Form.Description class={descriptionClasses}
					>{m['form.sections.personal.phone.description']()}</Form.Description
				>
				<Form.FieldErrors class="mt-2 text-sm text-red-500" />
			</Form.Field>
		</div>
	</div>

	<!-- Professional Information -->
	<div class="space-y-8">
		<div class="flex items-center gap-3 border-b border-gray-200 pb-4">
			<Briefcase class="text-primary h-6 w-6" />
			<h2 class="text-2xl font-semibold">{m['form.sections.professional.title']()}</h2>
		</div>
		<div class="grid gap-8 md:grid-cols-2">
			<Form.Field {form} name="province">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label class={labelClasses}
							>{m['form.sections.professional.province.label']()}</Form.Label
						>
						<Select.Root
							type="single"
							{...props}
							bind:value={$formData.province}
							onValueChange={() => ($formData.city = '')}
						>
							<Select.Trigger
								class={cn(
									'focus:border-primary focus:ring-primary/20 w-full rounded-lg border border-gray-200 bg-white/50 px-4 py-3 text-base transition-colors focus:ring-2 focus:outline-none',
									{ 'text-sm': !triggeredProvince?.id }
								)}
							>
								{#snippet children()}
									{#if isEnglish}
										{triggeredProvince?.label}
									{:else}
										{triggeredProvince?.fr_label}
									{/if}
								{/snippet}
							</Select.Trigger>
							<Select.Content class="rounded-lg border border-gray-200 bg-white shadow-lg">
								<Select.Group>
									<Select.Label class="px-4 py-2 text-sm font-medium text-gray-500"
										>{m['form.sections.professional.province.label']()}</Select.Label
									>
									{#each provinces as province}
										<Select.Item
											value={province.value}
											class="cursor-pointer px-4 py-2 text-base hover:bg-gray-50"
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
				<Form.FieldErrors class="mt-2 text-sm text-red-500" />
			</Form.Field>

			<Form.Field {form} name="city">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label class={labelClasses}
							>{m['form.sections.professional.city.label']()}</Form.Label
						>
						<Select.Root
							{...props}
							type="single"
							bind:value={$formData.city}
							disabled={!triggeredProvince?.id}
						>
							<Select.Trigger
								class={cn(
									'focus:border-primary focus:ring-primary/20 w-full rounded-lg border border-gray-200 bg-white/50 px-4 py-3 text-base transition-colors focus:ring-2 focus:outline-none',
									{ 'text-sm': !triggeredCity?.id }
								)}
							>
								{#snippet children()}
									{#if isEnglish}
										{triggeredCity?.label}
									{:else}
										{triggeredCity?.fr_label}
									{/if}
								{/snippet}
							</Select.Trigger>
							<Select.Content class="rounded-lg border border-gray-200 bg-white shadow-lg">
								<Select.Group>
									<Select.Label class="px-4 py-2 text-sm font-medium text-gray-500"
										>{m['form.sections.professional.city.label']()}</Select.Label
									>
									{#each cityOptions as city}
										<Select.Item
											value={city.value}
											class="cursor-pointer px-4 py-2 text-base hover:bg-gray-50"
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
				<Form.Description class={descriptionClasses}
					>{m['form.sections.professional.city.description']()}</Form.Description
				>
				<Form.FieldErrors class="mt-2 text-sm text-red-500" />
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
								'focus:border-primary focus:ring-primary/20 flex !h-auto min-h-[3.25rem] w-full flex-wrap items-center gap-1.5 rounded-lg border border-gray-200 bg-white/50 px-4 py-3 text-base transition-colors focus:ring-2 focus:outline-none',
								$formData.specializations?.length > 0 ? 'justify-start' : 'justify-center'
							)}
						>
							{#snippet children()}
								{#each triggeredSpecializations as specialization}
									<Badge
										class="bg-primary/10 text-primary hover:bg-primary/15 px-2 py-1 text-sm font-medium transition-colors"
									>
										{#if isEnglish}
											{specialization.label}
										{:else}
											{specialization.fr_label}
										{/if}
										<button
											type="button"
											class="focus-visible:outline-ring/70 text-primary/70 hover:bg-primary/20 hover:text-primary -my-px -ms-px -me-1 ml-1.5 inline-flex size-4 shrink-0 items-center justify-center rounded-full p-0 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2"
											onclick={() => {
												$formData.specializations = $formData.specializations.filter(
													(s: string) => s !== specialization.value
												);
											}}
										>
											<X size={12} aria-hidden="true" />
										</button>
									</Badge>
								{:else}
									<span class="text-gray-500 text-sm"
										>{m['form.sections.professional.specializations.placeholder']()}</span
									>
								{/each}
							{/snippet}
						</Select.Trigger>
						<Select.Content
							class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
						>
							<Select.Group class="space-y-1 p-1">
								<Select.Label class="px-2 py-1.5 text-sm font-medium text-gray-500"
									>{m['form.sections.professional.specializations.label']()}</Select.Label
								>
								{#each specializations as specialization}
									<Select.Item
										value={specialization.value}
										class="hover:bg-primary/5 focus:bg-primary/5 data-selected:bg-primary/10 data-selected:text-primary relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none"
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
									class="hover:bg-primary/5 focus:bg-primary/5 data-selected:bg-primary/10 data-selected:text-primary relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none"
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
			<Form.Description class={descriptionClasses}
				>{m['form.sections.professional.specializations.description']()}</Form.Description
			>
			<Form.FieldErrors class="mt-2 text-sm text-red-500" />
		</Form.Field>

		{#if otherSpecialization}
			<Form.Field {form} name="otherSpecialization">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label class={labelClasses}
							>{m['form.sections.professional.otherSpecialization.label']()}</Form.Label
						>
						<Input
							{...props}
							class={inputClasses}
							bind:value={$formData.otherSpecialization}
							placeholder={m['form.sections.professional.otherSpecialization.placeholder']()}
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors class="mt-2 text-sm text-red-500" />
			</Form.Field>
		{/if}

		<div class="grid gap-8 md:grid-cols-2">
			<Form.Field {form} name="yearsPractice">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label class={labelClasses}
							>{m['form.sections.professional.yearsPractice.label']()}</Form.Label
						>
						<Input
							type="number"
							min="0"
							max="70"
							{...props}
							class={inputClasses}
							bind:value={$formData.yearsPractice}
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors class="mt-2 text-sm text-red-500" />
			</Form.Field>

			<Form.Field {form} name="firmName">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label class={labelClasses}
							>{m['form.sections.professional.firmName.label']()}</Form.Label
						>
						<Input {...props} class={inputClasses} bind:value={$formData.firmName} />
					{/snippet}
				</Form.Control>
				<Form.Description class={descriptionClasses}
					>{m['form.sections.professional.firmName.description']()}</Form.Description
				>
				<Form.FieldErrors class="mt-2 text-sm text-red-500" />
			</Form.Field>
		</div>

		<Form.Field {form} name="website">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label class={labelClasses}
						>{m['form.sections.professional.website.label']()}</Form.Label
					>
					<Input type="url" {...props} class={inputClasses} bind:value={$formData.website} />
				{/snippet}
			</Form.Control>
			<Form.Description class={descriptionClasses}
				>{m['form.sections.professional.website.description']()}</Form.Description
			>
			<Form.FieldErrors class="mt-2 text-sm text-red-500" />
		</Form.Field>
	</div>

	<!-- Additional Information -->
	<div class="space-y-8">
		<div class="flex items-center gap-3 border-b border-gray-200 pb-4">
			<Info class="text-primary h-6 w-6" />
			<h2 class="text-2xl font-semibold">{m['form.sections.additional.title']()}</h2>
		</div>
		<Form.Field {form} name="referralSource">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label class={labelClasses}
						>{m['form.sections.additional.referralSource.label']()}</Form.Label
					>
					<Select.Root type="single" {...props} bind:value={$formData.referralSource}>
						<Select.Trigger
							class="focus:border-primary focus:ring-primary/20 w-full rounded-lg border border-gray-200 bg-white/50 px-4 py-3 text-base transition-colors focus:ring-2 focus:outline-none"
						>
							{#if isEnglish}
								{referralSources.find((source) => source.value === $formData.referralSource)?.label}
							{:else}
								{referralSources.find((source) => source.value === $formData.referralSource)
									?.fr_label}
							{/if}
						</Select.Trigger>
						<Select.Content class="rounded-lg border border-gray-200 bg-white shadow-lg">
							<Select.Group>
								<Select.Label class="px-4 py-2 text-sm font-medium text-gray-500"
									>{m['form.sections.additional.referralSource.label']()}</Select.Label
								>
								{#each referralSources as source}
									<Select.Item
										value={source.value}
										class="cursor-pointer px-4 py-2 text-base hover:bg-gray-50"
									>
										{#if isEnglish}
											{source.label}
										{:else}
											{source.fr_label}
										{/if}
									</Select.Item>
								{/each}
							</Select.Group>
						</Select.Content>
					</Select.Root>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors class="mt-2 text-sm text-red-500" />
		</Form.Field>

		<div class="space-y-6">
			<Form.Field {form} name="agreeBeta">
				<Form.Control>
					{#snippet children({ props })}
						<div class="flex items-center gap-3">
							<input
								{...props}
								type="checkbox"
								class="text-primary focus:ring-primary/20 h-5 w-5 rounded border-gray-300"
								bind:checked={$formData.agreeBeta}
								required
							/>
							<button
								type="button"
								class="text-primary hover:text-primary/80 cursor-pointer text-base font-medium underline decoration-2 underline-offset-2"
								onclick={() => (showNdaModal = true)}
							>
								{m['form.sections.additional.agreeBeta.label']()}
							</button>
						</div>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors class="mt-2 text-sm text-red-500" />
			</Form.Field>
		</div>
	</div>

	<Button
		type="submit"
		class={cn(
			'relative w-full py-7 text-lg font-semibold',
			'from-primary bg-gradient-to-r to-blue-600',
			'shadow-primary/30 shadow-[0_4px_20px_-3px]',
			'hover:shadow-primary/40 hover:shadow-[0_8px_30px_-3px]',
			'hover:scale-[1.01] active:scale-[0.99]',
			'transition-all duration-300 ease-out',
			'after:absolute after:inset-0',
			'after:bg-gradient-to-r after:from-white/0 after:via-white/10 after:to-white/0',
			'after:translate-x-[-100%] hover:after:translate-x-[100%]',
			'after:transition-transform after:duration-500',
			'overflow-hidden',
			'flex items-center justify-center gap-3'
		)}
	>
		<span class="relative z-10">{m['form.submit']()}</span>
		<ArrowRight
			class={cn(
				'relative z-10 h-5 w-5',
				'transition-transform duration-300',
				'group-hover:translate-x-1'
			)}
		/>
	</Button>
</form>

<NdaDialog
	bind:showNdaModal
	handleClick={() => ((showNdaModal = false), ($formData.agreeBeta = true), console.log($formData))}
/>
