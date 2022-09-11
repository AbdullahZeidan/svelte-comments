import { readable, writable } from 'svelte/store';
import type { CommentData, User } from './types';

export const userStore = readable<User>({
	image: {
		png: '/avatars/image-juliusomo.png',
		webp: '/avatars/image-juliusomo.webp'
	},
	username: 'juliusomo'
});

function createThread() {
	const { subscribe, update } = writable<CommentData[]>([
		{
			id: '1',
			content:
				"Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
			createdAt: '1 month ago',
			score: 12,
			user: {
				image: {
					png: '/avatars/image-amyrobson.png',
					webp: '/avatars/image-amyrobson.webp'
				},
				username: 'amyrobson'
			},
			replies: []
		},
		{
			id: '2',
			content:
				"Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
			createdAt: '2 weeks ago',
			score: 5,
			user: {
				image: {
					png: '/avatars/image-maxblagun.png',
					webp: '/avatars/image-maxblagun.webp'
				},
				username: 'maxblagun'
			},
			replies: [
				{
					id: '3',
					content:
						"If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
					createdAt: '1 week ago',
					score: 4,
					replyingTo: 'maxblagun',
					user: {
						image: {
							png: '/avatars/image-ramsesmiron.png',
							webp: '/avatars/image-ramsesmiron.webp'
						},
						username: 'ramsesmiron'
					}
				},
				{
					id: '4',
					content:
						"I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
					createdAt: '2 days ago',
					score: 2,
					replyingTo: 'ramsesmiron',
					user: {
						image: {
							png: '/avatars/image-juliusomo.png',
							webp: '/avatars/image-juliusomo.webp'
						},
						username: 'juliusomo'
					}
				}
			]
		}
	]);

	return {
		subscribe,

		addComment: ({ data, afterCommentId }: { data: CommentData; afterCommentId?: string }) => {
			if (!afterCommentId) {
				update((thread) => thread.concat(data));
				return;
			}

			update((thread) => {
				const idxOfCmntToInsertAfter = thread.findIndex((cmnt) => cmnt.id === afterCommentId);

				if (idxOfCmntToInsertAfter !== -1) {
					thread.splice(idxOfCmntToInsertAfter + 1, 0, data);
					return thread;
				}

				thread.forEach((cmnt) => {
					const idxOfReplyToInsertAfter = cmnt.replies?.findIndex((r) => r.id === afterCommentId);
					if (idxOfReplyToInsertAfter && idxOfReplyToInsertAfter !== -1) {
						cmnt.replies?.splice(idxOfReplyToInsertAfter + 1, 0, {
							...data,
							replyingTo: data.replyingTo as string
						});
						return;
					}
				});
				return thread;
			});
		},

		editComment: (commentId: string, newContent: string) => {
			update((thread) => {
				thread.forEach((cmnt, idx) => {
					if (cmnt.id === commentId) {
						thread[idx].content = newContent;
						return;
					}

					cmnt.replies?.forEach((reply, i) => {
						if (reply.id === commentId) {
							// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
							cmnt.replies![i].content = newContent;
							return;
						}
					});
				});
				return thread;
			});
		},

		deleteComment: (commentId: string) => {
			update((thread) => {
				// Filter the replies first
				thread.forEach((cmnt) => {
					cmnt.replies = cmnt.replies?.filter((reply) => reply.id !== commentId);
				});

				return thread.filter((cmnt) => cmnt.id !== commentId);
			});
		}
	};
}

export const threadStore = createThread();
