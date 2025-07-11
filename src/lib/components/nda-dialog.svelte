<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Button from './ui/button/button.svelte';
	import { m } from '$lib/paraglide/messages';

	let { showNdaModal = $bindable(false), handleClick } = $props();
</script>

<Dialog.Root bind:open={showNdaModal}>
	<Dialog.Content class="sm:max-w-[600px]">
		<Dialog.Header>
			<Dialog.Title class="text-2xl">{m['form.nda.title']()}</Dialog.Title>
			<Dialog.Description class="text-muted-foreground mt-2">
				{m['form.nda.description']()}
			</Dialog.Description>
		</Dialog.Header>

		<div class="mt-6 max-h-[60vh] space-y-4 overflow-y-auto pr-6">
			<div class="space-y-4 text-sm leading-relaxed">
				<p class="text-muted-foreground">
					{m['form.nda.intro']()}
				</p>
				<ul class="text-muted-foreground ml-4 list-disc space-y-2">
					<li>{m['form.nda.items.features']()}</li>
					<li>{m['form.nda.items.technical']()}</li>
					<li>{m['form.nda.items.ui']()}</li>
					<li>{m['form.nda.items.metrics']()}</li>
					<li>{m['form.nda.items.roadmap']()}</li>
				</ul>
				<p class="text-muted-foreground">
					{m['form.nda.conclusion']()}
				</p>
			</div>
		</div>

		<Dialog.Footer class="mt-6 flex justify-end gap-3">
			<Dialog.Close
				class="inline-flex h-10 items-center justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-200"
			>
				{m['form.nda.buttons.decline']()}
			</Dialog.Close>
			<Button
				type="button"
				class="bg-primary/95 hover:bg-primary/90 in line-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors"
				onclick={handleClick}
			>
				{m['form.nda.buttons.accept']()}
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
