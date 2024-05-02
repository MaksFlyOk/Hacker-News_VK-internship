import { Icon20CommentOutline } from '@vkontakte/icons'
import { Button, MiniInfoCell, Text, Title } from '@vkontakte/vkui'
import { FC } from 'react'

import { CommentsList } from '../../../../widgets/CommentsList/CommentsList'

import { dateTimeConvert } from '../../../../utils/dateTimeConvert'

import styles from './Comment.module.scss'

import type { CommentProps } from './types'

export const Comment: FC<CommentProps> = ({
	commentData,
	level,
	isShowComments,
	setShowComments,
	deleted
}) => {
	return (
		<div className={styles.commentWrapper}>
			<div>
				<Title level="2">
					{deleted ? 'Комментарий удален' : commentData.by}
				</Title>
				<MiniInfoCell className={styles.miniInfoCellTimeStyles}>
					{commentData?.time ? dateTimeConvert(commentData.time) : 'Неизвестно'}
				</MiniInfoCell>
			</div>
			{commentData?.text ? (
				<Text className={styles.textCommentStyles}>{commentData.text}</Text>
			) : null}
			<div className={styles.commentQuantityButtonWrapper}>
				{commentData?.kids?.length !== 0 && commentData?.kids ? (
					<Button
						onClick={() =>
							setShowComments(
								isShowComments === null ? true : isShowComments ? false : true
							)
						}
						size="s"
						appearance="neutral"
						before={<Icon20CommentOutline />}
						className={styles.quantityCommentButtonStyles}
					>
						{commentData?.kids.length}
					</Button>
				) : null}
			</div>
			{commentData?.kids && isShowComments !== null ? (
				<div style={{ display: isShowComments ? 'block' : 'none' }}>
					<CommentsList commentsArray={commentData?.kids} level={level + 1} />
				</div>
			) : null}
		</div>
	)
}
