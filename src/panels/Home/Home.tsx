import { useQueryClient } from '@tanstack/react-query'
import { Icon20RefreshOutline } from '@vkontakte/icons'
import {
	Button,
	Group,
	Header,
	Panel,
	PanelHeader,
	PanelProps,
	PullToRefresh,
	Spinner
} from '@vkontakte/vkui'
import { FC, useCallback, useEffect } from 'react'

import { ErrorCard } from '../../entities/Error/ErrorCard'

import { StoriesList } from '../../widgets/StoriesList/StoriesList'

import { useGetNewStoriesList } from '../../features/hooks/stories/useGetNewStoriesList'

import styles from './Home.module.scss'

import type { StoriesArrayUseQueryReturn } from './types'

export const Home: FC<PanelProps> = ({ id }) => {
	const queryClient = useQueryClient()

	const refetchStories = () => {
		queryClient.invalidateQueries({ queryKey: ['get new stories list'] })
	}

	let autoUpdateTimer = setInterval(() => refetchStories(), 60000)

	const {
		data: storiesArray,
		isPending,
		isFetching,
		isError
	}: StoriesArrayUseQueryReturn = useGetNewStoriesList()

	const onRefresh = useCallback(() => {
		refetchStories()

		clearInterval(autoUpdateTimer)
		autoUpdateTimer = setInterval(() => refetchStories(), 60000)
	}, [])

	useEffect(() => {
		return () => clearInterval(autoUpdateTimer)
	}, [])

	return (
		<Panel id={id}>
			<PullToRefresh onRefresh={onRefresh} isFetching={isFetching}>
				<PanelHeader>Главная</PanelHeader>
				<Group
					header={
						<Header mode="secondary" multiline={true}>
							Панель управления
						</Header>
					}
				>
					<Button
						mode="tertiary"
						align="left"
						stretched={true}
						appearance="accent"
						size="l"
						loading={isFetching}
						after={<Icon20RefreshOutline />}
						onClick={() => onRefresh()}
					>
						Обновить
					</Button>
				</Group>
				{isPending ? (
					<Spinner size="large" className={styles.spinnerStyles} />
				) : !storiesArray || isError ? (
					<ErrorCard />
				) : (
					<StoriesList storiesArray={storiesArray} />
				)}
			</PullToRefresh>
		</Panel>
	)
}
