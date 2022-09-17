<script lang="ts">
	import type { ReplyData } from '@types';
	import Comment from './Comment/Comment.svelte';

	export let replies: ReplyData[] | undefined;
</script>

{#if replies}
	<section class="replies">
		{#each replies as reply (reply.id)}
			<Comment isAReply commentData={reply} on:promptDelete />
		{/each}
	</section>
{/if}

<style lang="scss" global>
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
	
	.comment.reply {
		margin-inline-start: clamp(1.25em, 0.2em + 7%, 4em);
	}
</style>
