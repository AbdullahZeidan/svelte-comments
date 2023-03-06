<script lang="ts">
	import Modal from '@components/UI/Modal.svelte';
	import Comment from '@components/Comment/Comment.svelte';
	import Replies from '@components/Replies.svelte';
	import AddComment from '@components/Comment/AddComment.svelte';
	import type { CommentData, Nullable } from '@types';
	import { threadStore } from '@stores';

	export let comments: CommentData[];
	let deleteModal: Nullable<HTMLDialogElement> = null;
	let forComment: Nullable<string>;

	function handlePromptDelete({ detail }: CustomEvent<string>) {
		deleteModal?.showModal();
		forComment = detail;
	}
	function handleConfirmDelete() {
		threadStore.deleteComment(forComment!);
		deleteModal?.close();
		forComment = null;
	}
</script>

<div class="thread">
	<Modal
		heading="Delete comment"
		bind:ref={deleteModal}
		on:confirm={handleConfirmDelete}
	>
		Are you sure you want to delete this comment?
	</Modal>
	{#each comments as comment (comment.id)}
		<Comment commentData={comment} on:promptDelete={handlePromptDelete}>
			{#if comment.replies?.length}
				<Replies
					replies={comment.replies}
					on:promptDelete={handlePromptDelete}
				/>
			{/if}
		</Comment>
	{/each}
	<AddComment />
</div>

<style class="scss">
	:global(.avatar) {
		max-width: 2.5rem;
	}
	.thread {
		display: grid;
		gap: 1rem;

		max-width: 45rem;
		margin-inline: auto;
	}
</style>
