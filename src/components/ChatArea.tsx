import React from 'react';
import { useState, useRef, useEffect } from 'react';
import styles from './ChatArea.module.css';
import type { Chat, Message } from '../types/chat';
import { ChevronDown, Clock3, Check, CheckCheck } from 'lucide-react';
import type {MessageStatus} from '../types/chat'

interface ChatAreaProps {
    chat?: Chat;
    messages: Message[];
    onSendMessage: (text: string) => void;
}

const renderMessageStatus = (status: MessageStatus): React.ReactNode => {
        switch (status) {
            case 'sending':
                return <Clock3 size={15} aria-label="Message is sending"/>
            case 'sent':
                return <Check size={15} aria-label="Message is sent"/>
            case 'delivered':
                return <CheckCheck size={15} aria-label="Message is delivered"/>
            case 'read':
                return <CheckCheck size={15} className={styles.readImage} aria-label="Message is delivered"/>
            default:
                return null
        }
};

export const ChatArea: React.FC<ChatAreaProps> = ({ chat, messages, onSendMessage }) => {
    const [messageText, setMessageText] = useState<string>('');
    const [unseenMessagesIds, setUnseenMessagesIds] = useState<string[]>([]);
    const previousChatIdRef = useRef<string | undefined>(undefined);
    const isNearBottomRef = useRef(true);
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
    const messageFeedRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (previousChatIdRef.current === chat?.id) {
            const lastChatMessage = messages[messages.length - 1];

            if (!lastChatMessage) {
                return;
            }

            if (lastChatMessage.senderId === 'me') {
                bottomRef.current?.scrollIntoView({
                    behavior: 'smooth',
                });
                isNearBottomRef.current = true;
                setUnseenMessagesIds([]);
            } else {
                if (isNearBottomRef.current) {
                    bottomRef.current?.scrollIntoView({
                        behavior: 'smooth',
                    });
                } else {
                    setUnseenMessagesIds((previousIds) => {
                        if (previousIds.includes(lastChatMessage.id)) {
                            return previousIds;
                        } else {
                            return [
                                ...previousIds,
                                lastChatMessage.id,
                            ];
                        }
                    });
                }
            }
        } else {
            previousChatIdRef.current = chat?.id;

            bottomRef.current?.scrollIntoView({
                behavior: 'smooth',
            });

            isNearBottomRef.current = true;
            setUnseenMessagesIds([]);
            setShowScrollButton(false);
        }
    }, [messages, messages.length, chat?.id]);

    const handleScrollButton = () => {
        if (bottomRef.current !== null) {
            bottomRef.current.scrollIntoView({
                behavior: 'smooth',
            });

            isNearBottomRef.current = true;
            setUnseenMessagesIds([]);
            setShowScrollButton(false);
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmedText = messageText.trim();

        if (!trimmedText) {
            return;
        }

        onSendMessage(trimmedText);
        setMessageText('');
    };

    const handleScroll = () => {
        const feed = messageFeedRef.current;

        if (!feed) {
            return;
        }

        const distanceToBottom = feed.scrollHeight - feed.scrollTop - feed.clientHeight;

        isNearBottomRef.current = distanceToBottom <= 100;

        if (isNearBottomRef.current) {
            setShowScrollButton(false);
        } else {
            setShowScrollButton(true);
        }
    };

    useEffect(() => {
        const feed = messageFeedRef.current;

        if (!feed) {
            return;
        }

        if (unseenMessagesIds.length === 0) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const messageId = entry.target.getAttribute('data-message-id');

                    if (
                        messageId !== null
                        && entry.intersectionRatio >= 0.5
                        && entry.isIntersecting === true
                    ) {
                        setUnseenMessagesIds((previousIds) =>
                            previousIds.filter((id) => id !== messageId)
                        );

                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                root: feed,
                threshold: 0.5,
            }
        );

        unseenMessagesIds.forEach((messageId) => {
            const element = feed.querySelector(
                `[data-message-id="${messageId}"]`
            );

            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, [unseenMessagesIds]);

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
                        <div
                            key={msg.id}
                            data-message-id={msg.id}
                            className={`${styles.messageBubble} ${isMine ? styles.mine : styles.theirs}`}>
                            <div className={styles.messageText}>{msg.text}</div>
                            <div className={styles.timeStamp}>
                                {msg.timestamp}
                                {isMine === true && (
                                    renderMessageStatus(msg.status)
                                )}
                            </div>
                        </div>
                    );
                })}
                <div ref={bottomRef} />
            </div>

            {showScrollButton === true && (
                <button
                    type="button"
                    className={styles.scrollButton}
                    onClick={handleScrollButton}
                    aria-label="Перейти к сообщениям"
                >
                    <ChevronDown size={20} />
                    {unseenMessagesIds.length > 0 && (
                        <span className={styles.newMessagesBadge}>
                            {unseenMessagesIds.length}
                        </span>
                    )}
                </button>
            )}

            <footer className={styles.footer}>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Write a message..."
                        className={styles.inputField}
                        value={messageText}
                        onChange={(event) => setMessageText(event.target.value)}
                    />
                </form>
            </footer>
        </main>
    );
};
