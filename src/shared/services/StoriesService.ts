import { AxiosHackerNewsAPI } from '../../app/AxiosInstance'

class StoriesService {
	async GetNewStories() {
		return AxiosHackerNewsAPI.get('newstories.json')
	}

	async GetStoryById(id: number | string) {
		return AxiosHackerNewsAPI.get(`item/${id}.json`)
	}

	async GetMaxStoryId() {
		return AxiosHackerNewsAPI.get(`maxitem.json`)
	}
}

export default new StoriesService()
