<script script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { nanoid } from 'nanoid';
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

	function handleSubmit() {
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
		dispatch('cancel'); // used to hide the form
	}
</script>

<Card class="add-reply">
	<form on:submit|preventDefault={handleSubmit}>
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
			class="add-reply__input"
			rows="4"
			bind:value={contentInput}
		/>

		<div class="add-reply__actions">
			<img
				class="avatar avatar--mobile"
				src={$userStore.image.webp}
				alt="profile"
			/>
			<div class="actions__buttons">
				<Button type="submit" disabled={contentInput === ''}>Send</Button>
				<ActionButton variant="secondary" on:click={() => dispatch('cancel')}>
					Cancel
				</ActionButton>
			</div>
		</div>
	</form>
</Card>

<style lang="scss" global>
	.add-reply {
		margin-inline-start: clamp(1.25em, 0.2em + 7%, 4em);

		display: flex;
		flex-direction: column;
		gap: 1rem;

		> form {
			display: contents;
		}

		&__input {
			flex-grow: 1;
		}

		&__actions {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
	.actions__buttons {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 0.5rem;
	}

	.avatar--desktop {
		display: none;
	}

	@media screen and (min-width: 45rem) {
		.add-reply {
			flex-direction: row;
			align-items: flex-start;

			&__actions {
				flex-direction: column;
			}
		}
		.actions__buttons {
			flex-direction: column;
		}

		.avatar--desktop {
			display: initial;
		}
		.avatar--mobile {
			display: none;
		}
	}
</style>
