import { createContext, useEffect, useState } from 'react'
import { fetchData } from '../../utils/fetchData'
import MessageItem from '../message-item/message-item'
import { BASE_URL, TMessage, TUser } from '../../const'
import style from './message-list.module.css'

export const UserContext = createContext<Record<number, TUser>>({})

export function MessageList() {
	const [messages, setMessages] = useState<TMessage[]>([])
	const [users, setUsers] = useState<Record<number, TUser>>({})

	const loadMessages = async () => {
		const messages = await fetchData<TMessage[]>(`${BASE_URL}/posts`)
		if (messages) setMessages(messages)
	}

	const loadUsers = async () => {
		const usersData = await fetchData<TUser[]>(`${BASE_URL}/users`)
		if (usersData?.length) {
			const usersMapped = usersData.reduce((acc, next) => {
				return { ...acc, [next.id]: next }
			}, {})
			setUsers(usersMapped)
		}
	}

	useEffect(() => {
		loadMessages()
		loadUsers()
	}, [])
	return (
		<UserContext.Provider value={users}>
			<div>
				{messages.length ? (
					<div>
						{messages.slice(0, 20).map(message => (
							<MessageItem key={message.id} message={message} />
						))}
					</div>
				) : (
					<p className={style.noMessage}>Сообщения отсутствуют</p>
				)}
			</div>
		</UserContext.Provider>
	)
}
