<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import Button from './ui/button/button.svelte';

	let { showNdaModal = $bindable(false), handleClick } = $props();
</script>

<Dialog.Root bind:open={showNdaModal}>
	<Dialog.Content class="sm:max-w-[600px]">
		<Dialog.Header>
			<Dialog.Title class="text-2xl">NDA & Beta Terms</Dialog.Title>
			<Dialog.Description class="text-muted-foreground mt-2">
				Please review our Non-Disclosure Agreement and Beta Testing Terms carefully before
				proceeding.
			</Dialog.Description>
		</Dialog.Header>

		<div class="mt-6 max-h-[60vh] space-y-4 overflow-y-auto pr-6">
			<div class="space-y-4 text-sm leading-relaxed">
				<p class="text-muted-foreground">
					By participating in the JustiConnect Beta Program, you agree to maintain the
					confidentiality of all information shared during the beta testing period. This includes
					but is not limited to:
				</p>
				<ul class="text-muted-foreground ml-4 list-disc space-y-2">
					<li>Platform features and functionality</li>
					<li>Technical specifications and implementation details</li>
					<li>User interface designs and workflows</li>
					<li>Performance metrics and testing results</li>
					<li>Future development plans and roadmap</li>
				</ul>
				<p class="text-muted-foreground">
					Your feedback and participation are crucial for improving JustiConnect. We appreciate your
					commitment to helping us build a better platform while maintaining confidentiality.
				</p>
			</div>
		</div>

		<Dialog.Footer class="mt-6 flex justify-end gap-3">
			<Dialog.Close
				class="inline-flex h-10 items-center justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-200"
			>
				Decline
			</Dialog.Close>
			<Button
				type="button"
				class="bg-primary/95 hover:bg-primary/90 in line-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors"
				onclick={handleClick}
			>
				Accept Terms
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
