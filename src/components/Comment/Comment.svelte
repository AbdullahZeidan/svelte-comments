<script lang="ts">
	import Vote from './Vote.svelte';
	import Card from '@components/UI/Card.svelte';
	import Button from '@components/UI/Button.svelte';
	import CommentActions from './CommentActions.svelte';
	import { createEventDispatcher } from 'svelte';
	import type { CommentData, ReplyData } from '@types';
	import { threadStore, userStore } from '@stores';
	import AddComment from './AddComment.svelte';

	const dispatch = createEventDispatcher();

	export let commentData: CommentData | ReplyData;
	export let isAReply = false;
	let edit = {
		isEditing: false,
		editValue: ''
	};

	const { score, user, createdAt, content, replyingTo } = commentData;

	// handlers
	const handleUpvote = () => console.log('upvoted');
	const handleDownvote = () => console.log('downvoted');

	const handleEdit = () => {
		edit = { isEditing: true, editValue: commentData.content };
	};
	const handleConfirmEdit = () => {
		threadStore.editComment(commentData.id, edit.editValue);
		edit = { isEditing: false, editValue: '' };
	};

	const handleReply = (cmntId: string) => {
		console.log('REPLY', cmntId);
	};

	const onCommentDelete = (cmntId?: string) => dispatch('promptDelete', cmntId);
</script>

<Card class="comment {isAReply && 'reply'}">
	<Vote {score} on:upvote={handleUpvote} on:downvote={handleDownvote}>
		<div class="actions" slot="actions">
			<CommentActions
				comment={commentData}
				bind:isEditing={edit.isEditing}
				on:cancelEdit={() => (edit = { isEditing: false, editValue: '' })}
				on:delete={() => onCommentDelete(commentData.id)}
				on:edit={() => handleEdit()}
				on:reply={(e) => handleReply(e.detail)}
			/>
		</div>
	</Vote>
	<section class="comment__main">
		<div class="comment__head">
			<img class="avatar" src={user.image.webp} alt="" />
			<p class="head__username">
				{user.username}
				{#if user.username === $userStore.username}
					<span class="you-badge">you</span>
				{/if}
			</p>

			<p class="head__date">{createdAt}</p>

			<div class="actions">
				<CommentActions
					comment={commentData}
					bind:isEditing={edit.isEditing}
					on:cancelEdit={() => (edit = { isEditing: false, editValue: '' })}
					on:delete={() => onCommentDelete(commentData.id)}
					on:edit={() => handleEdit()}
					on:reply={(e) => handleReply(e.detail)}
				/>
			</div>
		</div>
		<div class="comment__content">
			{#if edit.isEditing}
				<textarea
					placeholder="Edit your comment..."
					label="Edit your comment."
					name="edit-comment"
					id="edit-comment"
					class="edit-comment"
					rows="4"
					bind:value={edit.editValue}
				/>
				<Button
					disabled={edit.editValue === '' || edit.editValue === commentData.content}
					type="button"
					on:click={handleConfirmEdit}>Update</Button
				>
			{:else}
				<p>
					<span class="replying-to">{replyingTo ? `@${replyingTo}` : ''}</span>
					{content}
				</p>
			{/if}
		</div>
	</section>
</Card>

<slot />

<style lang="scss" global>
	.comment {
		display: flex;
		flex-direction: column-reverse;
		align-items: flex-start;
		gap: 1rem;

		&__main {
			align-self: stretch;
			flex-grow: 1;
		}

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

	.edit-comment {
		min-width: 100%;
		margin-bottom: 0.3rem;
	}

	.replies {
		display: grid;
		gap: 1rem;
		position: relative;

		&::after {
			content: '';
			position: absolute;
			inset: 0 auto auto clamp(0.3em, 0.2em + 2%, 2.5em);
			width: 0.15rem;
			height: 100%;

			border-radius: var(--bdr-radius);
			background-color: var(--clr-neutral-300);
		}
	}

	.head {
		&__username {
			font-weight: var(--fw-500);
			color: var(--clr-neutral-700);
		}
		&__date {
			color: var(--clr-neutral-500);
		}
	}

	.you-badge {
		background-color: var(--clr-primary-500);
		color: var(--clr-neutral-100);
		font-size: 0.8rem;

		margin-inline-start: 0.3rem;
		padding: 0.2em 0.5em;
		border-radius: 0.2em;
	}

	.replying-to {
		color: var(--clr-primary-500);
		font-weight: var(--fw-500);
	}

	.actions {
		display: flex;
		gap: 0.5rem;
	}

	@media screen and (min-width: 45rem) {
		.comment {
			flex-direction: row;

			&__main {
				justify-self: unset;
			}
		}
		.comment__head :global(.actions) {
			margin-inline-start: auto;
			display: inherit;
		}
	}
</style>
