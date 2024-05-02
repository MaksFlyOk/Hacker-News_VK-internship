import { useQueryClient } from '@tanstack/react-query'
import {
	Icon20CalendarOutline,
	Icon20CommentOutline,
	Icon20FavoriteOutline,
	Icon28ErrorCircleOutline
} from '@vkontakte/icons'
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router'
import { Card, ContentCard, MiniInfoCell, Spinner } from '@vkontakte/vkui'
import { FC, useCallback } from 'react'

import { useGetStoryById } from '../../features/hooks/stories/useGetStoryById'

import { dateTimeConvert } from '../../utils/dateTimeConvert'

import styles from './StoryCard.module.scss'

import type { ResponseStoryDataUseQuery, StoryCardProps } from './types'

export const StoryCard: FC<StoryCardProps> = ({ storyId }) => {
	const queryClient = useQueryClient()

	const routeNavigator = useRouteNavigator()

	const {
		data: storyData,
		isFetching,
		isError
	}: ResponseStoryDataUseQuery = useGetStoryById(storyId)

	const onRefresh = useCallback(() => {
		queryClient.invalidateQueries({ queryKey: [`get story by id: ${storyId}`] })
	}, [])

	return (
		<Card mode="outline">
			{isFetching ? (
				<div className={styles.spinnerWrapper}>
					<Spinner size="regular" />
				</div>
			) : isError || !storyData ? (
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
				<ContentCard
					onClick={() => {
						routeNavigator.push(`story-panel/${storyData.id}`)
					}}
					subtitle={storyData?.by}
					header={storyData?.title}
					text={
						<>
							<MiniInfoCell
								before={<Icon20CalendarOutline />}
								className={styles.miniInfoCellStyles}
							>
								{storyData?.time
									? dateTimeConvert(storyData?.time)
									: 'Неизвестно'}
							</MiniInfoCell>
							<MiniInfoCell
								before={<Icon20CommentOutline />}
								className={styles.miniInfoCellStyles}
							>
								{storyData?.kids ? storyData.kids.length : 0}
							</MiniInfoCell>
							<MiniInfoCell
								before={<Icon20FavoriteOutline />}
								className={styles.miniInfoCellStyles}
							>
								{storyData?.score}
							</MiniInfoCell>
						</>
					}
					maxHeight={100}
					mode="tint"
				/>
			)}
		</Card>
	)
}
