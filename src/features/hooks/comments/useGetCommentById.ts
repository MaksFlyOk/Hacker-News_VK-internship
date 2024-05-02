import { useQuery } from '@tanstack/react-query'

import CommentsService from '../../../shared/services/CommentsService'

export const useGetCommentById = (id: number) => {
	return useQuery({
		queryKey: [`get comment by id: ${id}`],
		queryFn: () => CommentsService.GetCommentById(id),
		select: ({ data }) => data
	})
}
