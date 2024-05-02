import { useQuery } from '@tanstack/react-query'

import StoriesService from '../../../shared/services/StoriesService'

export const useGetStoryById = (id: number | string | undefined) => {
	return useQuery({
		queryKey: [`get story by id: ${id}`],
		queryFn: () => StoriesService.GetStoryById(id),
		select: ({ data }) => data,
		enabled: !!id
	})
}
