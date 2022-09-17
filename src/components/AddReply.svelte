<script script lang="ts">
	import { nanoid } from 'nanoid';
	import { createEventDispatcher } from 'svelte';
	import Card from '@components/UI/Card.svelte';
	import Button from '@components/UI/Button.svelte';
	import ActionButton from '@components/UI/ActionButton.svelte';
	import { threadStore, userStore } from '@stores';
	import type { ReplyData } from '@types';

	const dispatch = createEventDispatcher();

	// state
	let contentInput = '';

	// props
	export let replyingTo: {
		username: string;
		id: string;
	};

	function submitReply() {
		const newData: ReplyData = {
			id: nanoid(5),
			user: $userStore,
			content: contentInput,
			createdAt: 'Today',
			score: 0,
			replyingTo: replyingTo.username,
		};

		

		threadStore.addReply(newData, replyingTo.id);
		contentInput = '';
	}
</script>

<Card>
	<form on:submit|preventDefault={submitReply} class="add-reply">
		<div>
			<img
				class="avatar profile--desktop"
				src={$userStore.image.webp}
				alt="profile"
			/>
		</div>

		<textarea
			placeholder="Add a comment..."
			label="Write a comment."
			name="content"
			id="content"
			class="add-reply__input"
			rows="4"
			bind:value={contentInput}
		/>
		<div class="add-reply__actions">
			<img
				class="avatar profile--mobile"
				src={$userStore.image.webp}
				alt="profile"
			/>
			<Button type="submit" disabled={contentInput === ''}>Send</Button>
			<ActionButton variant="secondary" on:click={() => dispatch('cancel')}>
				Cancel
			</ActionButton>
		</div>
	</form>
</Card>

<style lang="scss">
	.add-reply {
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

	.profile--desktop {
		display: none;
	}

	@media screen and (min-width: 45rem) {
		.add-reply {
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
