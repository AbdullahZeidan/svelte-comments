<script lang="ts">
	let classname = '';
	export let type: 'submit' | 'reset' | 'button' = 'submit';
	export let disabled: boolean = false;
	export { classname as class };
</script>

<button class="btn {classname}" {type} {disabled} on:click>
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

		&--secondary {
			background-color: var(--clr-neutral-500);
		}
		&--danger {
			background-color: var(--clr-accent-500);
		}

		&:hover{
			opacity: 0.8;
		}
		&:disabled {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}
</style>
