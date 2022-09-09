<script lang="ts">
	import PlusIcon from '@icons/icon-plus.svg';
	import MinusIcon from '@icons/icon-minus.svg';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let score = 0;
</script>

<section label="Comment score" class="votes-container">
	<div class="votes">
		<button aria-label="Upvote" on:click={() => dispatch('upvote')}>
			<PlusIcon />
		</button>
		<p class="votes__score">{score}</p>
		<button aria-label="Downvote" on:click={() => dispatch('downvote')}>
			<MinusIcon />
		</button>
	</div>
	<slot name="actions" />
</section>

<style lang="scss">
	.votes-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: 0.75rem;

		align-self: stretch;
	}

	.votes {
		display: flex;
		align-items: center;
		justify-content: start;

		color: var(--clr-primary-500);
		background-color: var(--clr-neutral-200);
		border-radius: var(--bdr-radius);

		&__score {
			margin: 0 0.5rem;
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
		.votes-container {
			align-self: unset;
			:global(.btn-action) {
				display: none;
			}
		}
	}
</style>
