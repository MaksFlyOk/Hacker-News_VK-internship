import { useQuery } from '@tanstack/react-query'

import StoriesService from '../../../shared/services/StoriesService'

export const useGetNewStoriesList = () => {
	return useQuery({
		queryKey: ['get new stories list'],
		queryFn: () => StoriesService.GetNewStories(),
		select: ({ data }) => data.slice(0, 100)
	})
}
