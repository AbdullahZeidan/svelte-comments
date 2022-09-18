<script script lang="ts">
	import { nanoid } from 'nanoid';
	import Button from '@components/UI/Button.svelte';
	import Card from '@components/UI/Card.svelte';
	import { threadStore, userStore } from '@stores';
	import type { CommentData } from '@types';

	// state
	let contentInput = '';

	function submitComment() {
		const data: CommentData = {
			id: nanoid(5),
			user: $userStore,
			content: contentInput,
			createdAt: 'Today',
			score: 0,
			replies: [],
		};

		threadStore.addComment(data);
		contentInput = '';
	}
</script>

<Card>
	<form on:submit|preventDefault={submitComment} class="add-comment">
		<img
			class="avatar avatar--desktop"
			src={$userStore.image.webp}
			alt="profile"
		/>

		<textarea
			placeholder="Add a comment..."
			label="Write a comment."
			name="content"
			id="content"
			class="add-comment__input"
			rows="4"
			bind:value={contentInput}
		/>
		<div class="add-comment__actions">
			<img
				class="avatar avatar--mobile"
				src={$userStore.image.webp}
				alt="profile"
			/>
			<Button type="submit" disabled={contentInput === ''}>Send</Button>
		</div>
	</form>
</Card>

<style lang="scss">
	.add-comment {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		&__input {
			flex-grow: 1;
		}
		&__actions {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}

	.avatar--desktop {
		display: none;
	}

	@media screen and (min-width: 45rem) {
		.add-comment {
			flex-direction: row;
			align-items: flex-start;
		}
		.avatar--desktop {
			display: initial;
		}
		.avatar--mobile {
			display: none;
		}
	}
</style>
