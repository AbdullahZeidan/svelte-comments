<script lang="ts">
	import Button from './Button.svelte';
	import type { Nullable } from '@types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let ref: Nullable<HTMLDialogElement> = null;
	export let heading = 'Confirm?';
	// export let forComment: string;
</script>

<dialog class="modal" bind:this={ref}>
	<h2 class="modal__heading">{heading}</h2>
	<p class="modal__message">
		<slot />
	</p>
	<div class="modal__actions">
		<Button
			class="btn--secondary"
			on:click={() => {
				ref?.close();
			}}>No, cancel</Button
		>
		<Button class="btn--danger" on:click={() => dispatch('confirm')}>Yes, delete</Button>
	</div>
</dialog>

<style lang="scss">
	.modal {
		max-width: var(--size-mobile);
		padding: 1.5em 1.75em;
		border: none;
		border-radius: var(--bdr-radius);

		&[open] {
			animation: show 400ms ease normal;
		}

		&::backdrop {
			background-color: rgb(0 0 0 / 50%);
		}

		&__heading {
			font-size: calc(1.25 * var(--font-size));
			font-weight: var(--fw-500);
			color: var(--clr-neutral-700);
		}
		&__message {
			color: var(--clr-neutral-500);
		}
		&__actions {
			display: flex;
			gap: 0.75rem;

			:global(.btn) {
				flex: 1;
				padding-inline: 1em;
			}
		}
	}
	.modal > * + * {
		margin-top: 1rem;
	}

	@keyframes show {
		from {
			transform: translateY(15%);
			opacity: 0;
		}
		to {
			transform: translateY(0%);
			opacity: 1;
		}
	}
</style>
