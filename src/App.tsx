import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { mockChats, mockMessages } from './mock/mockData';
import { ChatArea } from './components/ChatArea';
import type { Chat, Message } from "./types/chat"
import styles from "./App.module.css";

export default function App() {
    const [chats, setChats] = useState<Chat[]>(mockChats)
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages);
    const currentMessages = activeChatId === null ? [] : messages[activeChatId] || [];
    const activeChat = chats.find((chat) => chat.id === activeChatId);

    const handleSelectedChat = (chatId: string) => {
        setActiveChatId(chatId);
        setChats((previousChats) => {
            return previousChats.map((chat) => {
                if (chat.id === chatId){
                    return {
                        ...chat,
                        unreadCount: 0
                    };
                }else {return chat}
            });
        });
    }

    const handleSendMessage = (text: string) => {
        if (!activeChatId) {return}
        const now: Date = new Date();
        const time: string = now.toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'});

        const newMessage: Message = {
            id: crypto.randomUUID(),
            chatId: activeChatId,
            senderId: 'me',
            text: text,
            timestamp: time,
            status: 'sent'
        };

        setMessages((previousMessages) => ({
            ...previousMessages,
            [activeChatId]: [
                ...(previousMessages[activeChatId] || []),
                newMessage
            ]
        }));

        setChats((previousChats) => {
            return previousChats.map((chat) => {
                if (chat.id === activeChatId){
                    return {
                        ...chat,
                        lastMessage: newMessage
                    }
                }else {return chat}
            })
        });
    };

    return (
        <div className={styles.container}>
            <Sidebar
                chats={chats}
                activeChatId={activeChatId}
                onSelectChat={handleSelectedChat}
            />

            <ChatArea
                chat={activeChat}
                messages={currentMessages}
                onSendMessage= {handleSendMessage}
            />
        </div>
    );
}