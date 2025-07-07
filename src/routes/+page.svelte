<script lang="ts">
	let name = $state('');
	let email = $state('');

	function handleSubmit(event: Event) {
		event.preventDefault();
		alert(`Name: ${name}\nEmail: ${email}`);
	}
</script>

<form onsubmit={handleSubmit}>
	<label>
		Name:
		<input type="text" bind:value={name} required />
	</label>
	<br />
	<label>
		Email:
		<input type="email" bind:value={email} required />
	</label>
	<br />
	<button type="submit">Submit</button>
</form>
