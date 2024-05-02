import type { ResponseStoryData } from '../../shared/types/types'

export type ResponseStoryDataUseQuery = {
	data: undefined | ResponseStoryData
	isPending: boolean
	isFetching: boolean
	isError: boolean
}
