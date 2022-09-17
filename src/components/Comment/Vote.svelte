<script lang="ts">
	import PlusIcon from '@icons/icon-plus.svelte';
	import MinusIcon from '@icons/icon-minus.svelte';
	import { threadStore } from '@stores';


	export let score = 0;
	export let commentId: string;

	const handleUpvote = () => threadStore.updateScore(commentId, score + 1);
	const handleDownvote = () => threadStore.updateScore(commentId, score - 1);	
</script>

<section class="votes-container" label="Comment score">
	<div class="votes">
		<button type="button" aria-label="Upvote" on:click={handleUpvote}>
			<PlusIcon />
		</button>
		<p class="votes__score">{score}</p>
		<button type="button" aria-label="Downvote" on:click={handleDownvote}>
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
