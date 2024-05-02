import type { ResponseCommentData } from '../../shared/types/types'

export type ResponseStoryDataUseQuery = {
	data: undefined | ResponseCommentData
	isFetching: boolean
	isError: boolean
}

export interface CommentCardProps {
	commentId: number
	level: number
}
