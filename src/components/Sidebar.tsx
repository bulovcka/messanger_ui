import React from 'react';
import type { Chat } from '../types/chat';
import styles from './Sidebar.module.css';

interface SidebarProps {
    chats: Chat[];
    activeChatId: string;
    onSelectChat: (chatId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
    chats,
    activeChatId,
    onSelectChat,
}) => {
    return (
        <aside className={styles.sidebar} >
            <div className={styles.header}>
                <h2 className={styles.title}>Chats</h2>
            </div>
            <div className={styles.chatList}>
                {chats.map((chat) => {
                    const isActive = chat.id == activeChatId;

                    return (
                        <div
                            key={chat.id}
                            onClick={() => onSelectChat(chat.id)}
                            className={`${styles.chatItem} ${isActive ? styles.active : ''}`}
                        >
                            <div className={styles.avatarWrapper}>
                                <img
                                    src={chat.participant.avatar}
                                    alt={chat.participant.name}
                                    className={styles.avatar}
                                />
                                {chat.participant.isOnline && <span className={styles.onlineBadge} />}

                            </div>

                            <div className={styles.info}>
                                <div className={styles.topRow}>
                                    <span className={styles.name}>{chat.participant.name}</span>
                                    <span className={styles.time}>{chat.lastMessage?.timestamp}</span>
                                </div>
                                <div className={styles.bottomRow}>
                                    <p className={styles.preview}>
                                        {chat.lastMessage?.text || 'No messages'}
                                    </p>
                                    {chat.unreadCount > 0 && (
                                        <span className={styles.unread}>{chat.unreadCount}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </aside>
    );
};