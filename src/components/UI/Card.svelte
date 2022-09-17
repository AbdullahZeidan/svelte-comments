<script>
	let classname = '';
	export { classname as class };
</script>

<div class="card {classname}"><slot /></div>

<style lang="scss">
	.card {
		--card-padding: 1em;
		padding: var(--card-padding, .5em);
		border-radius: var(--bdr-radius);
		background-color: var(--clr-neutral-100);
		box-shadow: 0 4px 6px -2px rgba(0, 0, 0, 7%);

		@media screen and (min-width: 45rem) {
			--card-padding: 1.5em;
		}
	}
</style>
