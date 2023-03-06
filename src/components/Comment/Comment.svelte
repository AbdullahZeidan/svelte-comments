<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Vote from './Vote.svelte';
	import Card from '@components/UI/Card.svelte';
	import Button from '@components/UI/Button.svelte';
	import AddReply from '../AddReply.svelte';
	import CommentActions from './CommentActions.svelte';
	import type { CommentData, ReplyData } from '@types';
	import { threadStore, userStore } from '@stores';

	const dispatch = createEventDispatcher();

	// props
	export let commentData: CommentData | ReplyData;
	export let isAReply = false;

	// state
	let edit = {
		isEditing: false,
		editValue: '',
	};
	let isReplying = false;

	const { user, createdAt, id } = commentData;

	// handlers
	const handleEdit = () => {
		edit = { isEditing: true, editValue: commentData.content };
	};

	const handleCancelEdit = () => (edit = { isEditing: false, editValue: '' });

	const handleConfirmEdit = () => {
		threadStore.editComment(id, edit.editValue);
		edit = { isEditing: false, editValue: '' };
	};

	const handleReply = (cmntId: string) => {
		isReplying = true;
		console.log('REPLY', cmntId);
	};

	const onCommentDelete = (cmntId?: string) => dispatch('promptDelete', cmntId);
</script>

<Card class="comment {isAReply && 'reply'}">
	<Vote score={commentData.score} commentId={id}>
		<div class="actions" slot="actions">
			<CommentActions
				comment={commentData}
				bind:isEditing={edit.isEditing}
				on:reply={(e) => handleReply(e.detail)}
				on:delete={() => onCommentDelete(id)}
				on:edit={handleEdit}
				on:cancelEdit={handleCancelEdit}
			/>
		</div>
	</Vote>
	<div class="comment__main">
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
					on:reply={(e) => handleReply(e.detail)}
					on:delete={() => onCommentDelete(id)}
					on:edit={handleEdit}
					on:cancelEdit={handleCancelEdit}
				/>
			</div>
		</div>
		<div class="comment__content">
			{#if edit.isEditing}
				<textarea
					placeholder="Edit your comment..."
					name="edit-comment-input"
					id="edit-comment-input"
					class="edit-comment-input"
					rows="4"
					bind:value={edit.editValue}
				/>
				<Button
					type="button"
					disabled={edit.editValue === '' ||
						edit.editValue === commentData.content}
					on:click={handleConfirmEdit}>Update</Button
				>
			{:else}
				<p>
					<span class="replying-to">
						{commentData.replyingTo ? `@${commentData.replyingTo}` : ''}
					</span>
					{commentData.content}
				</p>
			{/if}
		</div>
	</div>
</Card>
{#if isReplying}
	<AddReply
		replyingTo={{ username: user.username, id }}
		on:cancel={() => (isReplying = false)}
	/>
{/if}

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

	.edit-comment-input {
		min-width: 100%;
		margin-bottom: 0.3rem;
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
			&__head :global(.actions) {
				margin-inline-start: auto;
				display: inherit;
			}
		}
	}
</style>
