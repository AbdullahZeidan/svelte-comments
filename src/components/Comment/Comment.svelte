<script lang="ts">
	import type { CommentData } from './types';
	import ReplyIcon from '../../icons/icon-reply.svg';

	import ActionButton from '@components/UI/ActionButton.svelte';
	import Card from '@components/UI/Card.svelte';
	import CommentVote from './CommentVote.svelte';

	export let data: CommentData;

	const handleUpvote = () => console.log('upvoted');
	const handleDownvote = () => console.log('downvoted');
</script>

<Card class="comment">
	<CommentVote score={data.score} on:upvote={handleUpvote} on:downvote={handleDownvote} />
	<section>
		<div class="comment__head">
			<img class="head__avatar" src={data.user.image.webp} alt="" />
			<p class="head__username">{data.user.username}</p>
			<p class="head__date">{data.createdAt}</p>

			<div class="actions">
				<ActionButton variant="primary">
					<ReplyIcon /> Reply
				</ActionButton>
			</div>
		</div>
		<p class="comment__content">{data.content}</p>
	</section>
</Card>

<style lang="scss" global>
	.comment {
		display: flex;
		flex-direction: column-reverse;
		align-items: stretch;
		gap: 1rem;

		&__head {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			gap: 1rem;

			margin-bottom: 1rem;

			:global(.actions) {
				display: none;
			}
		}

		&__content {
			color: var(--clr-neutral-500);
		}
	}

	.head {
		&__avatar {
			max-width: 2.5rem;
		}
		&__username {
			font-weight: var(--fw-500);
			color: var(--clr-neutral-700);
		}
		&__date {
			color: var(--clr-neutral-500);
		}
	}

	:global(.actions) {
		display: flex;
		gap: 0.5rem;
	}

	@media screen and (min-width: 45rem) {
		.comment {
			flex-direction: row;
		}
		.comment__head :global(.actions) {
			margin-inline-start: auto;
			display: inherit;
		}
	}
</style>
