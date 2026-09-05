export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read';

export interface User {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
    lastSeen?: string;
}

export interface Message {
    id: string;
    chatId: string;
    senderId: string;
    text: string;
    timestamp: string;
    status: MessageStatus;
}

export interface Chat {
    id: string;
    lastMessage?: Message;
    participant: User;
    unreadCount: number;
}