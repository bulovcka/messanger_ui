import React from 'react';
import styles from './ChatArea.module.css';
import type { Chat, Message } from '../types/chat';


interface ChatAreaProps {
    chat?: Chat;
    messages: Message[];
}

export const ChatArea: React.FC<ChatAreaProps> = ({ chat, messages }) => {
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
            <div className={styles.messageFeed}>
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
            </div>
            <footer className={styles.footer}>
                <input type='text' placeholder='Write a message...' className={styles.inputField} />
            </footer>
        </main>
    )
}