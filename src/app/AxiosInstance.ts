import axios from 'axios'

const BASE_URL = 'https://hacker-news.firebaseio.com/v0'

export const AxiosHackerNewsAPI = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})
