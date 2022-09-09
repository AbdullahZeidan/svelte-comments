<script script lang="ts">
	import { nanoid } from 'nanoid';
	import Button from '@components/UI/Button.svelte';
	import Card from '@components/UI/Card.svelte';
	import { threadStore, userStore } from '@stores';
	import ActionButton from '@components/UI/ActionButton.svelte';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let replyingTo:
		| {
				username: string;
				id: string;
		  }
		| undefined = undefined;
	let contentInput = '';

	function submitComment(e: SubmitEvent) {
		threadStore.addComment({
			data: {
				content: contentInput,
				createdAt: 'Today',
				id: nanoid(5),
				score: 0,
				user: $userStore,
				replies: [],
				replyingTo: replyingTo?.username
			},
			afterCommentId: replyingTo?.id
		});
		contentInput = '';
	}
</script>

<Card>
	<form on:submit|preventDefault={submitComment} class="add-comment">
		<div>
			<img class="avatar profile--desktop" src={$userStore.image.webp} alt="profile" />
		</div>

		<textarea
			placeholder="Add a comment..."
			label="Write a comment."
			name="content"
			id="content"
			class="comment-input"
			rows="4"
			bind:value={contentInput}
		/>
		<div class="add-comment__submit">
			<img class="avatar profile--mobile" src={$userStore.image.webp} alt="profile" />
			<Button type="submit" disabled={contentInput === ''}>Send</Button>
			<!-- <ActionButton variant="secondary" on:click={() => dispatch('cancel')}>Cancel</ActionButton> -->
		</div>
	</form>
</Card>

<style lang="scss">
	.add-comment {
		display: flex;
		flex-direction: column;
		gap: 1rem;

		&__submit {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}

	.comment-input {
		flex-grow: 1;
	}

	.profile--desktop {
		display: none;
	}

	@media screen and (min-width: 45rem) {
		.add-comment {
			flex-direction: row;
			align-items: flex-start;
		}
		.profile--desktop {
			display: initial;
		}
		.profile--mobile {
			display: none;
		}
	}
</style>
