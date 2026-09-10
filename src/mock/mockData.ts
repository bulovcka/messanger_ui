import pehatAvatar from '../pictures/peh.jpg';
import johnPorkAvatar from '../pictures/jp.jpeg';
import type { Chat, Message, User } from "../types/chat";

export const currentUser: User = {
    id: 'me',
    name: 'Egor Melnikov',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    isOnline: true,
};

export const mockChats: Chat[] = [
    {
        id: 'chat_1',
        participant: {
            id: '1',
            name: 'John Pork',
            avatar: johnPorkAvatar,
            isOnline: true,
        },
        unreadCount: 2,
        lastMessage: {
            id: 'm1',
            chatId: 'chat_1',
            senderId: 'u1',
            text: 'Привет, как дела?',
            timestamp: '14:20',
            status: 'delivered',
        },
    },
    {
        id: 'chat_2',
        participant: {
            id: '2',
            name: 'Jane Doe',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
            isOnline: false,
            lastSeen: 'Last seen 20 minutes ago',
        },
        unreadCount: 0,
        lastMessage: {
            id: 'm2',
            chatId: 'chat_2',
            senderId: 'me',
            text: 'How is it going?',
            timestamp: '14:25',
            status: 'read',
        },
    },
    {
        id: 'chat_3',
        participant: {
            id: '3',
            name: 'Pehat',
            avatar: pehatAvatar,
            isOnline: true,
        },
        unreadCount: 1,
        lastMessage: {
            id: 'm3',
            chatId: 'chat_3',
            senderId: 'u3',
            text: 'Купи мне катер',
            timestamp: 'Yesterday',
            status: 'read'
        },
    },
];

export const mockMessages: Record<string, Message[]> = {
    chat_1: [
        {
            id: 'm101',
            chatId: 'chat_1',
            senderId: 'u1',
            text: 'Как продвигается работа',
            timestamp: '10:00',
            status: 'read',
        },
        {
            id: 'm102',
            chatId: 'chat_1',
            senderId: 'me',
            text: 'Пока все нормально',
            timestamp: '10:05',
            status: 'read',
        },
        {
            id: 'm1',
            chatId: 'chat_1',
            senderId: 'u1',
            text: 'Привет, как дела?',
            timestamp: '14:20',
            status: 'delivered',
        },
    ],
    chat_2: [
        {
            id: 'm201',
            chatId: 'chat_2',
            senderId: '2',
            text: 'Hi Egor, are you available?',
            timestamp: '14:15',
            status: 'read',
        },
        {
            id: 'm2',
            chatId: 'chat_2',
            senderId: 'me',
            text: 'How is it going?',
            timestamp: '14:25',
            status: 'read',
        },
    ],
    chat_3: [
        {
            id: 'm301',
            chatId: 'chat_3',
            senderId: 'me',
            text: 'Привет, что нового?',
            timestamp: 'Yesterday',
            status: 'read',
        },
        {
            id: 'm3',
            chatId: 'chat_3',
            senderId: '3',
            text: 'Купи мне катер',
            timestamp: 'Yesterday',
            status: 'read',
        },
    ],
};