import { useQueryClient } from '@tanstack/react-query'
import { Icon28ErrorCircleOutline } from '@vkontakte/icons'
import { ContentCard, MiniInfoCell, Spinner } from '@vkontakte/vkui'
import { FC, useCallback, useState } from 'react'

import { useGetCommentById } from '../../features/hooks/comments/useGetCommentById'

import styles from './CommentCard.module.scss'

import { Comment } from './components/Comment'
import type { CommentCardProps, ResponseStoryDataUseQuery } from './types'

export const CommentCard: FC<CommentCardProps> = ({ commentId, level }) => {
	const queryClient = useQueryClient()

	const [isShowComments, setShowComments] = useState<null | boolean>(null)

	const {
		data: commentData,
		isFetching,
		isError
	}: ResponseStoryDataUseQuery = useGetCommentById(commentId)

	const onRefresh = useCallback(() => {
		queryClient.invalidateQueries({
			queryKey: [`get comment by id: ${commentId}`]
		})
	}, [])

	return (
		<div style={{ marginBottom: 12 }}>
			{isFetching ? (
				<div className={styles.spinnerWrapper}>
					<Spinner size="regular" />
				</div>
			) : isError || !commentData ? (
				<ContentCard
					onClick={() => onRefresh()}
					header="Ошибка"
					text={
						<>
							<MiniInfoCell
								before={<Icon28ErrorCircleOutline />}
								className={styles.miniInfoCellStyles}
							>
								Кликните по карточке чтобы Обновить
							</MiniInfoCell>
						</>
					}
					mode="tint"
				/>
			) : (
				<Comment
					commentData={commentData}
					level={level + 1}
					deleted={commentData?.deleted}
					isShowComments={isShowComments}
					setShowComments={setShowComments}
				/>
			)}
		</div>
	)
}
