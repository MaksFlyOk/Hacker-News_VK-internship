import type { ResponseStoryData } from '../../shared/types/types'

export type ResponseStoryDataUseQuery = {
	data: undefined | ResponseStoryData
	isFetching: boolean
	isError: boolean
}

export interface StoryCardProps {
	storyId: number
}
