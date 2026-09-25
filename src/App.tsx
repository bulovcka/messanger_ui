import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { mockChats, mockMessages } from './mock/mockData';
import { ChatArea } from './components/ChatArea';
import type { Chat } from "./types/chat"
import styles from "./App.module.css";

export default function App() {
    const [chats, setChats] = useState<Chat[]>(mockChats)
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const currentMessages = activeChatId === null ? [] : mockMessages[activeChatId] || [];
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
            />
        </div>
    );
}