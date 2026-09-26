import React from 'react';
import { useState, useRef, useEffect } from 'react';
import styles from './ChatArea.module.css';
import type { Chat, Message } from '../types/chat';


interface ChatAreaProps {
    chat?: Chat;
    messages: Message[];
    onSendMessage: (text: string) => void; 
}

export const ChatArea: React.FC<ChatAreaProps> = ({ chat, messages, onSendMessage }) => {
    const [messageText, setMessageText] = useState<string>();
    const [newMessagesCount, setNewMessagesCount] = useState<number>(0);
    const previousChatIdRef = useRef<string | undefined>(undefined);
    const isNearBottomRef = useRef(true);
    const bottomRef = useRef(null);
    const messageFeedRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (previousChatIdRef.current === chat?.id){
            const lastChatMessage = messages[messages.length - 1];
            if (!lastChatMessage) { return }
            if (lastChatMessage.senderId === "me") {
                setNewMessagesCount(0);
                bottomRef.current.scrollIntoView({
                    behavior: 'smooth'
                });
            }else{
                if (isNearBottomRef.current){
                    setNewMessagesCount(0);
                    bottomRef.current.scrollIntoView({
                    behavior: 'smooth'
                    });
                }else{
                    setNewMessagesCount(newMessagesCount => newMessagesCount + 1);
                    console.log(newMessagesCount);
                }
            }

        }else{
            setNewMessagesCount(0);
            previousChatIdRef.current = chat?.id;
            bottomRef.current.scrollIntoView({
                    behavior: 'smooth'
                });
            return;
        }
    }, [messages.length, chat?.id]);
    const handleSubmit = ((event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        const trimmedText = messageText.trim();
        if (!trimmedText){
            return
        }

        onSendMessage(trimmedText);
        setMessageText('');
    })

    const handleScroll = () => {
        const feed = messageFeedRef.current;
        if (!feed){
            return;
        }

        const distanceToBottom = feed.scrollHeight - feed.scrollTop - feed.clientHeight;

        isNearBottomRef.current = distanceToBottom <= 100;

        console.log(isNearBottomRef.current, distanceToBottom);

    }

    if (!chat) {
        return (
            <main className={styles.emptyState}>
                <p>Select chat to start conversation</p>
            </main>

        );
    }

    return (
        <main className={styles.chatArea}>
            <header className={styles.header}>
                <img src={chat.participant.avatar} alt={chat.participant.name} className={styles.avatar} />
                <div className={styles.headerInfo}>
                    <h3 className={styles.userName}>
                        {chat.participant.name}
                    </h3>
                    <span className={styles.status}>
                        {chat.participant.isOnline ? 'Online' : (chat.participant.lastSeen || 'Offline')}
                    </span>
                </div>
            </header>
            <div className={styles.messageFeed} ref={messageFeedRef} onScroll={handleScroll}>
                {messages.map((msg) => {
                    const isMine = msg.senderId === 'me';
                    return (
                        <div key={msg.id} className={`${styles.messageBubble} ${isMine ? styles.mine : styles.theirs} `}>
                            <div className={styles.messageText}>{msg.text}</div>
                            <div className={styles.timeStamp}>
                                {msg.timestamp}
                            </div>
                        </div>
                    );
                })}
                <div ref={bottomRef}></div>
            </div>
            <footer className={styles.footer}>
                <form onSubmit = {handleSubmit}>
                    <input 
                    type='text' placeholder='Write a message...' className={styles.inputField} 
                    value = {messageText}
                    onChange = {(event) => setMessageText(event.target.value)}
                    />
                </form>
            </footer>
        </main>
    )
}