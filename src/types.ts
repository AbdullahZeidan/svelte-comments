export interface CommentData {
	id: string;
	content: string;
	createdAt: string;
	score: number;
	user: User;
	replies?: ReplyData[];
	replyingTo?: string;
}

export interface User {
	image: {
		png: string;
		webp: string;
	};
	username: string;
}

export interface ReplyData extends CommentData {
	replyingTo: string;
}

export interface ThreadData {
	comments: CommentData[];
}

/** Can be null, but not undefined */
export type Nullable<T> = T | null;
