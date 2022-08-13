<script lang="ts">
	import Button from '@components/UI/Button.svelte';

	import Card from '@components/UI/Card.svelte';

	// import type { User } from "./types";
	export const activeUser = {};
	let content = '';

	function submitComment(e: SubmitEvent) {
		console.log('submitting comment... done.');
	}
</script>

<Card>
	<form on:submit|preventDefault={submitComment} class="add-comment">
		<!-- img visible on desktop -->
		<div><img class="profile--desktop" src="" alt="profile" /></div>

		<textarea
			placeholder="Add a comment..."
			label="Write a comment."
			name="content"
			id="content"
			class="add-comment__input"
			rows="6"
			bind:value={content}
		/>
		<div class="add-comment__submit">
			<img class="profile--mobile" src="" alt="profile" />
			<Button type="submit">Send</Button>
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
		&__submit {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
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
