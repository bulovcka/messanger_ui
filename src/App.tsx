import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { mockChats, mockMessages } from './mock/mockData';
import { ChatArea } from './components/ChatArea';
import styles from "./App.module.css";

export default function App() {
    const [activeChatId, setActiveChatId] = useState<string>('chat_1');
    const activeChat = mockChats.find((chat) => chat.id === activeChatId);
    const currentMessages = mockMessages[activeChatId] || [];
    return (
        <div className={styles.container}>
            <Sidebar
                chats={mockChats}
                activeChatId={activeChatId}
                onSelectChat={setActiveChatId}
            />

            <ChatArea
                chat={activeChat}
                messages={currentMessages}
            />
        </div>
    );
}