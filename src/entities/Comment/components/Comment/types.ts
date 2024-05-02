import type { ResponseCommentData } from '../../../../shared/types/types'

export interface CommentProps {
	commentData: ResponseCommentData
	level: number
	isShowComments: boolean | null
	setShowComments: (value: boolean) => void
	deleted?: boolean
}
