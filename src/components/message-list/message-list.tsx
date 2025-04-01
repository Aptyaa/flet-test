import { useEffect, useState } from 'react'
import { fetchData } from '../../utils/fetchData'
import { MessageItem } from '../message-item/message-item'
import { BASE_URL, TMessage } from '../../const'
import style from './message-list.module.css'

export function MessageList() {
	const [messages, setMessages] = useState<TMessage[]>([])

	const loadMessages = async () => {
		const messages = await fetchData<TMessage[]>(`${BASE_URL}/posts`)
		if (messages) setMessages(messages)
	}

	useEffect(() => {
		loadMessages()
	}, [])

	return (
		<div>
			{messages.length ? (
				<div>
					{messages.map(message => (
						<MessageItem key={message.id} message={message} />
					))}
				</div>
			) : (
				<p className={style.noMessage}>Сообщения отсутствуют</p>
			)}
		</div>
	)
}
