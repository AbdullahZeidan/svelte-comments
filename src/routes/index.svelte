<script lang="ts">
	import '../globals.scss';
	import Thread from '@components/Thread.svelte';
	import { threadStore } from '@stores';
</script>

<svelte:head>
	<title>Interactive Comments</title>
</svelte:head>
<main>
	<Thread comments={$threadStore.comments} />
</main>

<style lang="scss">
	main {
		padding-block: 2rem;
		padding-inline: 0.6rem;
	}
</style>
