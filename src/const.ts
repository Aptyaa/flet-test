export const BASE_URL = 'https://jsonplaceholder.typicode.com'

export type TComment = {
	postId: number
	id: number
	email: string
	body: string
}
export type TMessage = {
	userId: number
	id: number
	title: string
	body: string
}

export type TUser = {
	id: number
	username: string
	email: string
}
