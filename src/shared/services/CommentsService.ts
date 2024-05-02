import { AxiosHackerNewsAPI } from '../../app/AxiosInstance'

class CommentsService {
	async GetCommentById(id: number) {
		return AxiosHackerNewsAPI.get(`item/${id}.json`)
	}
}

export default new CommentsService()
