import { useEffect, useState } from 'react'
import { fetchData } from '../../utils/fetchData'
import { TComment, TMessage, TUser } from '../../const'
import { CommentItem } from '../comment-item/comment-item'
import { Button } from '../button/button'
import loader from '../../assets/loader.svg'
import style from './message-item.module.css'
import { Devider } from '../devider/devider'
import { BASE_URL } from '../../const'

type TMessageItemProp = {
	message: TMessage
}

export function MessageItem({ message }: TMessageItemProp) {
	const [comments, setComments] = useState<TComment[]>([])
	const [isLoaded, setIsLoaded] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isVisible, setIsVisible] = useState(false)
	const [user, setUser] = useState<TUser | null>(null)

	const loadComments = async () => {
		if (isLoaded) return
		setIsLoading(true)
		const comments = await fetchData<TComment[]>(
			`${BASE_URL}/comments?postId=${message.id}`
		)
		setIsLoaded(true)
		setIsLoading(false)
		if (comments) setComments(comments)
	}

	const loadUser = async () => {
		const userData = await fetchData<TUser>(
			`${BASE_URL}/users/${message.userId}`
		)
		if (userData) setUser(userData)
	}

	useEffect(() => {
		loadUser()
	}, [])

	const handleClick = () => {
		loadComments()
		setIsVisible(!isVisible)
	}

	return (
		<div className={style.container}>
			<div className={style.messageHeader}>
				<p className={style.author}>{user?.username}</p>
				<p className={style.email}>✉ {user?.email}</p>
			</div>

			<p className={style.title}>{message.title}</p>
			<div className={style.body}>{message.body}</div>

			<Button
				isLoading={isLoading}
				icon={loader}
				variant='outline'
				className={style.btn}
				onClick={handleClick}
			>
				{isVisible ? 'Скрыть комментарии' : 'Показать комментарии'}
			</Button>

			{isVisible && <Devider />}

			<div
				className={
					isVisible ? style.commentsContainer : style.commentsContainerHidden
				}
			>
				{isVisible &&
					comments.map(comment => (
						<CommentItem key={comment.id} comment={comment} />
					))}
			</div>
		</div>
	)
}
