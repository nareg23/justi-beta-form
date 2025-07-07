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
	interface Props {
		form: any;
		formData: any;
		showNdaModal: any;
		enhance: any;
		locationsAndSpecializations: {
			locations: {
				provinces: Database['public']['Tables']['location']['Row'][];
				cities: Database['public']['Tables']['location']['Row'][];
			};
			specializations: Database['public']['Tables']['specialization']['Row'][];
		};
	}

	let {
		form,
		formData,
		showNdaModal = $bindable(),
		enhance,
		locationsAndSpecializations
	}: Props = $props();

	const {
		locations: { cities, provinces },
		specializations
	} = locationsAndSpecializations;

	const inputClasses =
		'w-full rounded-lg border border-gray-200 bg-white/50 px-4 py-3 text-base transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20';
	const labelClasses = 'text-sm font-medium text-gray-700 mb-1.5';
	const descriptionClasses = 'mt-1.5 text-sm text-gray-500';

	const triggeredSpecializations = $derived.by(() => {
		if ($formData?.specializations?.length === 0) {
			return [];
		}
		return $formData.specializations?.map((specialization: string) => {
			return specializations.find((s) => s.value === specialization);
		});
	});
	const triggeredProvince = $derived.by(() => {
		if ($formData?.province) {
			return provinces.find((p) => p.value === $formData.province);
		}
		return {
			id: '',
			label: 'Select your province',
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
			value: ''
		};
	});
</script>

<form method="POST" use:enhance class="space-y-12">
	<!-- Personal Information -->
	<div class="space-y-8">
		<div class="flex items-center gap-3 border-b border-gray-200 pb-4">
			<UserCircle class="text-primary h-6 w-6" />
			<h2 class="text-2xl font-semibold">Personal Information</h2>
		</div>
		<div class="grid gap-8 md:grid-cols-2">
			<Form.Field {form} name="firstName">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label class={labelClasses}>First Name</Form.Label>
						<Input {...props} class={inputClasses} bind:value={$formData.firstName} />
					{/snippet}
				</Form.Control>
				<Form.Description class={descriptionClasses}>Used for your public profile</Form.Description>
				<Form.FieldErrors class="mt-2 text-sm text-red-500" />
			</Form.Field>

			<Form.Field {form} name="lastName">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label class={labelClasses}>Last Name</Form.Label>
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
						<Form.Label class={labelClasses}>Email</Form.Label>
						<Input type="email" {...props} class={inputClasses} bind:value={$formData.email} />
					{/snippet}
				</Form.Control>
				<Form.Description class={descriptionClasses}>We'll send your invite here</Form.Description>
				<Form.FieldErrors class="mt-2 text-sm text-red-500" />
			</Form.Field>

			<Form.Field {form} name="phone">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label class={labelClasses}>Phone</Form.Label>
						<Input type="tel" {...props} class={inputClasses} bind:value={$formData.phone} />
					{/snippet}
				</Form.Control>
				<Form.Description class={descriptionClasses}
					>For identity verification only</Form.Description
				>
				<Form.FieldErrors class="mt-2 text-sm text-red-500" />
			</Form.Field>
		</div>
	</div>

	<!-- Professional Information -->
	<div class="space-y-8">
		<div class="flex items-center gap-3 border-b border-gray-200 pb-4">
			<Briefcase class="text-primary h-6 w-6" />
			<h2 class="text-2xl font-semibold">Professional Information</h2>
		</div>
		<div class="grid gap-8 md:grid-cols-2">
			<Form.Field {form} name="province">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label class={labelClasses}>Province</Form.Label>
						<Select.Root
							type="single"
							{...props}
							bind:value={$formData.province}
							onValueChange={() => ($formData.city = '')}
						>
							<Select.Trigger
								class="focus:border-primary focus:ring-primary/20 w-full rounded-lg border border-gray-200 bg-white/50 px-4 py-3 text-base transition-colors focus:ring-2 focus:outline-none"
							>
								{#snippet children()}
									{triggeredProvince?.label}
								{/snippet}
							</Select.Trigger>
							<Select.Content class="rounded-lg border border-gray-200 bg-white shadow-lg">
								<Select.Group>
									<Select.Label class="px-4 py-2 text-sm font-medium text-gray-500"
										>Provinces</Select.Label
									>
									{#each provinces as province}
										<Select.Item
											value={province.value}
											class="cursor-pointer px-4 py-2 text-base hover:bg-gray-50"
										>
											{province.label}
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
						<Form.Label class={labelClasses}>City</Form.Label>
						<Select.Root
							type="single"
							{...props}
							bind:value={$formData.city}
							disabled={!triggeredProvince?.id}
						>
							<Select.Trigger
								class="focus:border-primary focus:ring-primary/20 w-full rounded-lg border border-gray-200 bg-white/50 px-4 py-3 text-base transition-colors focus:ring-2 focus:outline-none"
							>
								{#snippet children()}
									{triggeredCity?.label}
								{/snippet}
							</Select.Trigger>
							<Select.Content class="rounded-lg border border-gray-200 bg-white shadow-lg">
								<Select.Group>
									<Select.Label class="px-4 py-2 text-sm font-medium text-gray-500"
										>Cities</Select.Label
									>
									{#each cityOptions as city}
										<Select.Item
											value={city.value}
											class="cursor-pointer px-4 py-2 text-base hover:bg-gray-50"
										>
											{city.label}
										</Select.Item>
									{/each}
								</Select.Group>
							</Select.Content>
						</Select.Root>
					{/snippet}
				</Form.Control>
				<Form.Description class={descriptionClasses}
					>Your primary practice location</Form.Description
				>
				<Form.FieldErrors class="mt-2 text-sm text-red-500" />
			</Form.Field>
		</div>

		<Form.Field {form} name="specializations">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label class={labelClasses}>
						Areas of Practice <span class="text-xs text-gray-500">(max 3)</span>
					</Form.Label>
					<Select.Root type="multiple" {...props} bind:value={$formData.specializations}>
						<Select.Trigger
							class={cn(
								'focus:border-primary focus:ring-primary/20 flex  !h-auto min-h-[3.25rem] w-full flex-wrap items-center  gap-1.5 rounded-lg border border-gray-200 bg-white/50 px-4 py-3 text-base transition-colors focus:ring-2 focus:outline-none',
								$formData.specializations.length > 0 ? 'justify-start' : 'justify-center'
							)}
						>
							{#snippet children()}
								{#each triggeredSpecializations as specialization}
									<Badge
										class="bg-primary/10 text-primary hover:bg-primary/15 px-2 py-1 text-sm font-medium transition-colors"
									>
										{specialization.label}
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
									<span class="text-gray-500 text-sm">Select your practice areas</span>
								{/each}
							{/snippet}
						</Select.Trigger>
						<Select.Content
							class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
						>
							<Select.Group class="space-y-1 p-1">
								<Select.Label class="px-2 py-1.5 text-sm font-medium text-gray-500"
									>Practice Areas</Select.Label
								>
								{#each specializations as specialization}
									<Select.Item
										value={specialization.value}
										class="hover:bg-primary/5 focus:bg-primary/5 data-selected:bg-primary/10 data-selected:text-primary relative flex cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none"
									>
										{specialization.label}
									</Select.Item>
								{/each}
							</Select.Group>
						</Select.Content>
					</Select.Root>
				{/snippet}
			</Form.Control>
			<Form.Description class={descriptionClasses}>Select all that apply</Form.Description>
			<Form.FieldErrors class="mt-2 text-sm text-red-500" />
		</Form.Field>

		<div class="grid gap-8 md:grid-cols-2">
			<Form.Field {form} name="yearsPractice">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label class={labelClasses}>Years of Practice</Form.Label>
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
						<Form.Label class={labelClasses}>Firm Name</Form.Label>
						<Input {...props} class={inputClasses} bind:value={$formData.firmName} />
					{/snippet}
				</Form.Control>
				<Form.Description class={descriptionClasses}>Optional</Form.Description>
				<Form.FieldErrors class="mt-2 text-sm text-red-500" />
			</Form.Field>
		</div>

		<Form.Field {form} name="website">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label class={labelClasses}>Website</Form.Label>
					<Input type="url" {...props} class={inputClasses} bind:value={$formData.website} />
				{/snippet}
			</Form.Control>
			<Form.Description class={descriptionClasses}
				>Optional - must start with https://</Form.Description
			>
			<Form.FieldErrors class="mt-2 text-sm text-red-500" />
		</Form.Field>
	</div>

	<!-- Additional Information -->
	<div class="space-y-8">
		<div class="flex items-center gap-3 border-b border-gray-200 pb-4">
			<Info class="text-primary h-6 w-6" />
			<h2 class="text-2xl font-semibold">Additional Information</h2>
		</div>
		<Form.Field {form} name="referralSource">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label class={labelClasses}>How did you hear about us?</Form.Label>
					<Select.Root type="single" {...props} bind:value={$formData.referralSource}>
						<Select.Trigger
							class="focus:border-primary focus:ring-primary/20 w-full rounded-lg border border-gray-200 bg-white/50 px-4 py-3 text-base transition-colors focus:ring-2 focus:outline-none"
						>
							{$formData.referralSource}
						</Select.Trigger>
						<Select.Content class="rounded-lg border border-gray-200 bg-white shadow-lg">
							<Select.Group>
								<Select.Label class="px-4 py-2 text-sm font-medium text-gray-500"
									>Referral Source</Select.Label
								>
								{#each referralSources as source}
									<Select.Item
										value={source}
										class="cursor-pointer px-4 py-2 text-base hover:bg-gray-50"
										>{source}</Select.Item
									>
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
								type="checkbox"
								{...props}
								class="text-primary focus:ring-primary/20 h-5 w-5 rounded border-gray-300"
								checked={$formData.agreeBeta}
								oninput={(e) => ($formData.agreeBeta = true)}
								required
							/>
							<span
								class="text-primary hover:text-primary/80 cursor-pointer text-base font-medium underline decoration-2 underline-offset-2"
								onclick={() => (showNdaModal = true)}
							>
								I accept the NDA & Beta Terms
							</span>
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
		<span class="relative z-10">Submit Application</span>
		<ArrowRight
			class={cn(
				'relative z-10 h-5 w-5',
				'transition-transform duration-300',
				'group-hover:translate-x-1'
			)}
		/>
	</Button>
</form>

<div class="mt-8 flex items-center justify-between text-sm text-gray-400">
	<p>© {new Date().getFullYear()} JustiConnect. All rights reserved.</p>
	<div class="flex items-center gap-1.5">Made with 🍁 in Canada</div>
</div>

{#if showNdaModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6 backdrop-blur-sm"
		role="dialog"
		aria-modal="true"
	>
		<div class="relative w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl">
			<button
				class="absolute top-4 right-4 text-gray-400 transition-colors duration-200 hover:text-black"
				onclick={() => (showNdaModal = false)}
				aria-label="Close">✕</button
			>
			<h2 class="text-primary mb-6 text-2xl font-bold">NDA & Beta Terms</h2>
			<div class="prose prose-sm max-h-[60vh] overflow-y-auto">
				<p>
					By participating in the JustiConnect Beta Program, you agree to maintain the
					confidentiality of all information shared during the beta testing period...
				</p>
				<!-- Add more terms content here -->
			</div>
			<button
				class="bg-primary text-primary-foreground shadow-glow hover:bg-primary-strong transition-smooth mt-6 w-full rounded-xl py-3 font-semibold hover:translate-y-[-1px] hover:shadow-xl"
				onclick={() => (showNdaModal = false)}>Close</button
			>
		</div>
	</div>
{/if}
