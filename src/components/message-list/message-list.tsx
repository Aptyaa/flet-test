import {  useEffect, useState } from 'react'
import {  fetchMessages,TMessage } from '../../utils/fetchData'
import { MessageItem } from '../message-item/message-item'
import style from './message-list.module.css'
import { Button } from '../button/button'


export function MessageList(){
    const [messages, setMessages] = useState<TMessage[]>([])
      const [messageIsVisible, setMessageIsVisible] = useState(true)
    
      const loadMessages = async () => {
        const messages = await fetchMessages() as unknown as TMessage[]
      // const messages = await fetchData<any[]>(MESSAGES_URL)
      if(messages)  setMessages(messages)
      }
      useEffect(()=>{
        loadMessages()
      },[])
    
      // const loadComments = async () =>{
      //     const c = await fetchData<any[]>(COMMENTS_URL)
      //     if(c) setMessages(c)
      // }
      const handleClick = async() =>{
        console.log(messageIsVisible)
        // if(!messages.length)  loadMessages() 
          setMessageIsVisible(!messageIsVisible)
      }
    // console.log(messages.length)
    
      return (
       <div>
       <Button onClick={handleClick}>Загрузить сообщения</Button>
       { messageIsVisible&&messages.length? <div>{
        messages.map(message=>(
          <MessageItem key={message.id} message={message}/>
        ))}
        </div>:<p  className={style.noMessage}>Сообщения отсутствуют</p>}
       </div>
      )
}