import { FC } from 'react'

import { CommentCard } from '../../entities/Comment/CommentCard'

import styles from './CommentList.module.scss'

import type { CommentsListProps } from './types'

export const CommentsList: FC<CommentsListProps> = ({
	commentsArray,
	level
}) => {
	return (
		<>
			{typeof commentsArray !== 'undefined' && commentsArray.length !== 0 ? (
				<div className={styles.commentListWrapper}>
					{level === 0 ? null : (
						<span className={styles.commentSeparator}></span>
					)}
					{commentsArray.map((commentId) => (
						<CommentCard
							commentId={commentId}
							level={level}
							key={`comment id: ${commentId}`}
						/>
					))}
				</div>
			) : null}
		</>
	)
}
