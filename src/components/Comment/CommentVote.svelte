<script lang="ts">
	import PlusIcon from '@icons/icon-plus.svg';
	import MinusIcon from '@icons/icon-minus.svg';
	import DeleteIcon from '@icons/icon-delete.svg';
	import EditIcon from '@icons/icon-edit.svg';

	import ActionButton from '@components/UI/ActionButton.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let score = 0;
</script>

<section class="votes-container">
	<div class="votes">
		<button aria-label="Upvote comment" on:click={() => dispatch('upvote')}><PlusIcon /></button>
		<p class="votes__score">{score}</p>
		<button aria-label="Downvote comment" on:click={() => dispatch('downvote')}
			><MinusIcon /></button
		>
	</div>
	<div class="actions">
		<ActionButton variant="secondary" on:click={() => console.log('clicked')}>
			<DeleteIcon /> Delete
		</ActionButton>
		<ActionButton variant="primary" on:click={() => console.log('clicked')}>
			<EditIcon /> Edit
		</ActionButton>
	</div>
</section>

<style lang="scss">
	.votes-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.votes {
		display: flex;
		align-items: center;
		justify-content: start;

		color: var(--clr-primary-500);
		background-color: var(--clr-neutral-200);
		border-radius: var(--bdr-radius);

		&__score {
			margin: 0.4rem 0.7rem;
			font-weight: var(--fw-500);
		}

		button {
			background-color: inherit;
			color: inherit;
			border-radius: inherit;
			padding: 0.5em 1em;

			transition-property: color, background-color;
			transition-duration: var(--duration);
			transition-timing-function: linear;

			&:hover {
				background-color: var(--clr-neutral-300);
			}
		}
	}

	@media screen and (min-width: 45rem) {
		.votes {
			flex-direction: column;
		}
		.votes-container :global(.btn-action) {
			display: none;
		}
	}
</style>
