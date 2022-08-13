<script lang="ts">
	let classname = '';
	let itsType: 'submit' | 'reset' | 'button' = 'button';
	export { classname as class, itsType as type };
</script>

<button class="btn {classname}">
	<slot />
</button>

<style lang="scss">
	.btn {
		padding: 0.75em 1.9em;
		border-radius: 0.5em;

		background-color: var(--clr-primary-500);
		color: var(--clr-neutral-100);
		text-transform: uppercase;

		transition: opacity var(--duration) linear;

		&:hover {
			opacity: 0.5;
		}
	}
</style>
