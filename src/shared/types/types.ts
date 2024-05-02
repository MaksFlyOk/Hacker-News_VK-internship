export interface ResponseStoryData {
	by: string
	descendants: number
	id: number
	kids?: number[]
	score: number
	time: number
	title: string
	url: string
	type: 'story'
}

export interface ResponseCommentData {
	by: string
	id: number
	kids?: number[]
	deleted?: boolean
	parent: number
	text: string
	time: number
	type: 'comment'
}
