<script lang="ts">
	let count = 0;
	$: heads = `${count} heads`;
</script>

<button on:click={() => (count -= 1)} aria-label="Decrement"> - </button>
<p>Count: {heads}</p>
<button on:click={() => (count += 1)} aria-label="Increment"> + </button>
