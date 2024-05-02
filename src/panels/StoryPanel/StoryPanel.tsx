import { useQueryClient } from '@tanstack/react-query'
import {
	Icon20CalendarOutline,
	Icon20CommentOutline,
	Icon20FavoriteOutline,
	Icon20LinkCircleOutline,
	Icon20RefreshOutline,
	Icon20UserCircleOutline
} from '@vkontakte/icons'
import {
	useActiveVkuiLocation,
	useParams,
	useRouteNavigator
} from '@vkontakte/vk-mini-apps-router'
import {
	Button,
	Card,
	ContentCard,
	Div,
	Group,
	Header,
	MiniInfoCell,
	Panel,
	PanelHeader,
	PanelHeaderBack,
	PanelProps,
	PullToRefresh,
	Spacing,
	Spinner,
	Title,
	usePlatform
} from '@vkontakte/vkui'
import { FC, useCallback } from 'react'

import { ErrorCard } from '../../entities/Error/ErrorCard.tsx'

import { CommentsList } from '../../widgets/CommentsList/CommentsList.tsx'

import { useAppDispatch } from '../../features/hooks/redux/reduxTypes.ts'
import { useGetStoryById } from '../../features/hooks/stories/useGetStoryById.ts'

import { dateTimeConvert } from '../../utils/dateTimeConvert'

import styles from './StoryPanel.module.scss'

import { setActiveModal } from '../../features/slices/modalSlice/modalSlice.ts'

import type { ResponseStoryDataUseQuery } from './types.ts'

export const StoryPanel: FC<PanelProps> = ({ id }) => {
	const queryClient = useQueryClient()
	const params = useParams<'storyId'>()

	const routeNavigator = useRouteNavigator()
	const { panelsHistory } = useActiveVkuiLocation()

	const platform = usePlatform()
	const dispatch = useAppDispatch()

	const {
		data: storyData,
		isPending,
		isFetching,
		isError
	}: ResponseStoryDataUseQuery = useGetStoryById(params?.storyId)

	const onRefresh = useCallback(() => {
		queryClient.invalidateQueries({
			queryKey: storyData?.kids?.map(
				(comment) => `get comment by id: ${comment}`
			)
		})
	}, [])

	return (
		<Panel id={id}>
			<PullToRefresh onRefresh={onRefresh} isFetching={isFetching}>
				<PanelHeader
					before={
						<PanelHeaderBack
							onClick={() => {
								if (panelsHistory[0] === 'story-panel') {
									routeNavigator.replace('/')
								} else {
									routeNavigator.back()
								}
							}}
							label={platform === 'vkcom' ? 'Back' : undefined}
						/>
					}
				>
					Story
				</PanelHeader>
				<Group
					header={
						isPending || isError ? null : (
							<Header mode="primary" multiline={true}>
								{storyData?.title}
							</Header>
						)
					}
				>
					{isPending ? (
						<Div>
							<Spinner size="large" className={styles.spinnerStyles} />
						</Div>
					) : isError || !storyData ? (
						<ErrorCard
							refresh={{ refreshFunction: onRefresh, loading: isFetching }}
						/>
					) : (
						<>
							<Div className={styles.storyInfoWrapper}>
								<Card mode="outline">
									<ContentCard
										text={
											<>
												<MiniInfoCell
													before={<Icon20UserCircleOutline />}
													className={styles.miniInfoCellStyles}
												>
													{storyData?.by}
												</MiniInfoCell>
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
												<Spacing />
												{storyData?.url ? (
													<Button
														mode="link"
														align="left"
														stretched={true}
														before={<Icon20LinkCircleOutline />}
														onClick={() =>
															dispatch(
																setActiveModal({
																	url: storyData?.url,
																	active: 'id'
																})
															)
														}
													>
														{storyData?.url}
													</Button>
												) : null}
											</>
										}
										mode="tint"
									/>
								</Card>
							</Div>
							{storyData?.kids && storyData?.kids?.length !== 0 ? (
								<Div>
									<div style={{ marginBottom: 12 }}>
										<Title level="2" style={{ marginBottom: 12 }}>
											Комментарии
										</Title>
										<Button
											loading={isFetching}
											onClick={() => onRefresh()}
											after={<Icon20RefreshOutline />}
										>
											Обновить список комментариев
										</Button>
									</div>
									<Group mode="plain">
										<CommentsList commentsArray={storyData?.kids} level={0} />
									</Group>
								</Div>
							) : null}
						</>
					)}
				</Group>
			</PullToRefresh>
		</Panel>
	)
}
