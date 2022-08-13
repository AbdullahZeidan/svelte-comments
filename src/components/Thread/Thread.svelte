<script lang="ts">
	import type { CommentData } from '@components/Comment/types';
	import Comment from '@components/Comment/Comment.svelte';
	import AddComment from '@components/Comment/AddComment.svelte';

	export let comments: CommentData[];
	console.log(comments);
</script>

<div class="thread">
	{#each comments as comment (comment.id)}
		<Comment data={comment} />
	{/each}
	<AddComment />
</div>

<style class="scss">
	.thread {
		display: grid;
		gap: 1rem;

		max-width: 45rem;
		margin-inline: auto;
	}
</style>
