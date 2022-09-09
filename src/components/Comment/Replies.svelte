<script lang="ts">
	import type { ReplyData } from '@types';
	import Comment from './Comment.svelte';

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
	.comment.reply {
		margin-inline-start: clamp(1.25em, 0.2em + 7%, 4em);
	}
</style>
