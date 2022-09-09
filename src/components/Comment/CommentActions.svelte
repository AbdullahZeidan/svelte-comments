<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ReplyIcon from '@icons/icon-reply.svg';
	import DeleteIcon from '@icons/icon-delete.svg';
	import EditIcon from '@icons/icon-edit.svg';
	import ActionButton from '@components/UI/ActionButton.svelte';
	import { userStore } from '@stores';
	import type { CommentData } from '@types';

	const dispatch = createEventDispatcher();

	export let comment: CommentData;
	export let isEditing: boolean;
</script>

{#if isEditing}
	<ActionButton variant="secondary" on:click={() => dispatch('cancelEdit')}>Cancel</ActionButton>
{:else if comment.user.username === $userStore.username}
	<ActionButton variant="secondary" on:click={() => dispatch('delete')}>
		<DeleteIcon /> Delete
	</ActionButton>
	<ActionButton variant="primary" on:click={() => dispatch('edit')}>
		<EditIcon /> Edit
	</ActionButton>
{:else}
	<ActionButton variant="primary" on:click={() => dispatch('reply', comment.id)}
		><ReplyIcon /> Reply
	</ActionButton>
{/if}
