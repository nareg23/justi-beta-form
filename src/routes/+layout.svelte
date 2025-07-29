<script lang="ts">
	import '../app.css';
	import '@fontsource-variable/roboto';
	import '@fontsource-variable/nunito-sans';

	let { children } = $props();
</script>

<svelte:head>
	<title>JustiConnect | Beta Signup</title>
	<meta name="description" content="JustiConnect | Beta Signup" />
	<meta name="keywords" content="JustiConnect, Beta Signup, JustiConnect Beta Signup" />
	<meta name="author" content="JustiConnect" />
	<script
		defer
		src="https://analytics.nariano.com/script.js"
		data-website-id="b23e9a45-1b43-48d7-b6e1-9b1d8bd25977"
	></script>
</svelte:head>

{@render children()}
