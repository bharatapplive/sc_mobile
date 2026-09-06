import { Injectable, signal, computed } from '@angular/core';
import { Message, ChatUser } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private users: Record<string, ChatUser> = {
    '1': {
      id: '1',
      name: 'Alex Rivera',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD07_S3eQPzzP91tFtSaiWi4xJecJ8e4WaVQUglCM5PjQQju0YX6FGLgs_p0jnX-pRVrG34BJ0bfjtNuq7UwENDhbQUjRFrt8zxueW-ADrqtHh-e5C-KU2KXRFtdrm6raLZIDLq7e3Nc4MP2bFkDgOT8zpSdNHlrBrRCk3CmJNx6qgpEXKDUpR7Lq7THYwxSUjzU3RlnyrSw0cljE44ydlASvRXU4syi-sQnAXpQWVT4z3V_s4-mMdGyOw8TOQMOU5myrbTl1Fwz_o',
      isOnline: true,
      lastSeen: 'Active now'
    },
    '2': {
      id: '2',
      name: 'Jordan Smith',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAM_yfzjQYPRrh5pfGistHa-YLXlSLsALZOXKONJ3grBFFqnrutKo3oHWRotqMI34Rom_atqrhl_odg_06m2ga_S0WUhVRvetcPTvp2iM-cyzvw0vfb46QJpBN2JsXFrusDM53BOHQ091mMlWEYtU2vVQonrY4rDpJFzNtZt-jsQADz6iyyGYLEQQQs7JBdH2wbfLkDcVPp0dVr_vxa51Wo2m7if3KtgYGLoR1XdSg7-LXGGlMnaBctIe56vEa9HCPJVQdMH3MPt1Q',
      isOnline: false,
      lastSeen: 'Last seen 12m ago'
    },
    '3': {
      id: '3',
      name: 'Design Team 🎨',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArIbDwpvym7pD31bc9FA1PMQI3hM35HT-As8RXEJp5cY2MSv-HbVmhGdA4uKIRqL9QOMi4D5NzObaowzjARpGQ0dWVMyHRyY8Bzq3eWTp9kC6aGpekiA_fNCYABqirSjxgtG-6bXJqqQZQCywuyXQngh829Z2VKsCXX4Nn20NQtt_l7xcGEYON5L9XuDi6L1kb-iyoZhGiLpQoV7viafzFaHL-Z-oATrTh8YVA9TqUFftaF8yebE889FwEcQh6zNvbuqN1UCdeT-s',
      isOnline: true,
      lastSeen: '4 members online'
    },
    '4': {
      id: '4',
      name: 'Marcus Chen',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVTeF7TjfroLxJtf5ZcdLFyrrScEMa_BUu9yNhagpmlR01VxHhloSZOl9AbAC5XqES4dh4z5cqeAQWWcT4h-jKNsOc0lDBzw13jnORed6Aaae5ecFnra_HRm8uAzPHDmMo43Lq2X33o9J0Tgtmf0N46tnMnS-Ul3kGi9QsZiLIVKiEKI9tIskxd-AMEIKPzF0FsBMuX3VKGk7zJZ91Ob_ndVAVldq-nKfx7KS6EAEKo_VNj8LktMa5gZWtRYki36D68M5f26gWeZY',
      isOnline: false,
      lastSeen: 'Last seen 3h ago'
    },
    '5': {
      id: '5',
      name: 'Sarah Wilson',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUYjRbGlzaSCVr3U1q0ZI6I5H9LNHzTroXnQzv2O0GghYnzdXsUtD2b5qkreny83yWqyj_qXK7EMx2dEhvmbY0huNbC-sW5FUn4tRnL8Lg_G860HvvqIKN86FRjivcY39dveuQpNe7Ypth9hRD4g2w0z9PPGd08UF6JTyvH9WOitwH7Zwjk0zswX-MaLZhlyKU5sGdsFlR5wJuRzs19Km6oFJN0Qtptz4skP0aVLhi85yuUA-64bPgc6FPHQVdOLSuIIj6k0Lopzk',
      isOnline: true,
      lastSeen: 'Active now'
    }
  };

  private messagesMap = signal<Record<string, Message[]>>({
    '1': [
      {
        id: 'm1',
        conversationId: '1',
        senderId: '1',
        text: 'Hey! Did you check out the new design system update for Social Circle? 🎨',
        timestamp: '10:14 AM',
        status: 'read',
        type: 'text'
      },
      {
        id: 'm2',
        conversationId: '1',
        senderId: 'me',
        text: 'Hey Alex! Yes I did, the purple gradients and glassmorphism elements look amazing! ✨',
        timestamp: '10:16 AM',
        status: 'read',
        type: 'text'
      },
      {
        id: 'm3',
        conversationId: '1',
        senderId: '1',
        text: 'Awesome! Are you coming to the creative mixer tonight?',
        timestamp: '10:20 AM',
        status: 'read',
        type: 'text'
      },
      {
        id: 'm4',
        conversationId: '1',
        senderId: 'me',
        text: 'Definitely! I will bring the updated prototype preview. See you there 🚀',
        timestamp: '10:22 AM',
        status: 'delivered',
        type: 'text'
      }
    ],
    '2': [
      {
        id: 'm2_1',
        conversationId: '2',
        senderId: '2',
        text: 'That design you posted on Social Circle is absolutely fire! 🔥',
        timestamp: '11:45 AM',
        status: 'read',
        type: 'text'
      },
      {
        id: 'm2_2',
        conversationId: '2',
        senderId: 'me',
        text: 'Thank you Jordan! Worked really hard on the interactions.',
        timestamp: '11:48 AM',
        status: 'read',
        type: 'text'
      }
    ]
  });

  private isTypingMap = signal<Record<string, boolean>>({});

  public getChatUser(conversationId: string): ChatUser {
    return this.users[conversationId] || {
      id: conversationId,
      name: 'Ananya Sharma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
      isOnline: true,
      lastSeen: 'Active now'
    };
  }

  public getMessagesSignal(conversationId: string) {
    return computed(() => this.messagesMap()[conversationId] || []);
  }

  public getIsTypingSignal(conversationId: string) {
    return computed(() => !!this.isTypingMap()[conversationId]);
  }

  public sendMessage(conversationId: string, text: string, type: 'text' | 'image' | 'file' = 'text', imageUrl?: string): Message {
    const currentMessages = this.messagesMap()[conversationId] || [];
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsg: Message = {
      id: 'msg_' + Date.now(),
      conversationId,
      senderId: 'me',
      text,
      timestamp: formattedTime,
      status: 'sent',
      type,
      imageUrl
    };

    const updatedMessages = [...currentMessages, newMsg];
    this.messagesMap.update(map => ({
      ...map,
      [conversationId]: updatedMessages
    }));

    // Simulate status update to delivered & read
    setTimeout(() => {
      this.updateMessageStatus(conversationId, newMsg.id, 'delivered');
    }, 1000);

    setTimeout(() => {
      this.updateMessageStatus(conversationId, newMsg.id, 'read');
    }, 2200);

    // Simulate response typing after 2.5 seconds
    this.simulatePartnerResponse(conversationId);

    return newMsg;
  }

  private updateMessageStatus(conversationId: string, messageId: string, status: 'sending' | 'sent' | 'delivered' | 'read') {
    const currentMessages = this.messagesMap()[conversationId] || [];
    const updated = currentMessages.map(m => m.id === messageId ? { ...m, status } : m);
    this.messagesMap.update(map => ({
      ...map,
      [conversationId]: updated
    }));
  }

  private simulatePartnerResponse(conversationId: string) {
    setTimeout(() => {
      // Show typing indicator
      this.isTypingMap.update(map => ({ ...map, [conversationId]: true }));

      setTimeout(() => {
        // Hide typing indicator and post reply
        this.isTypingMap.update(map => ({ ...map, [conversationId]: false }));

        const replies = [
          "That sounds super awesome! 🙌",
          "Got it! Thanks for sharing. 👍",
          "Love it! Let's catch up soon. 🔥",
          "Perfect! I will take a look at it right away.",
          "Awesome! Can't wait to see more. ✨"
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        const user = this.getChatUser(conversationId);
        const now = new Date();
        const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const partnerMsg: Message = {
          id: 'msg_' + Date.now(),
          conversationId,
          senderId: user.id,
          text: randomReply,
          timestamp: formattedTime,
          status: 'read',
          type: 'text'
        };

        const currentMessages = this.messagesMap()[conversationId] || [];
        this.messagesMap.update(map => ({
          ...map,
          [conversationId]: [...currentMessages, partnerMsg]
        }));
      }, 2500);
    }, 1500);
  }

  public clearChat(conversationId: string): void {
    this.messagesMap.update(map => ({
      ...map,
      [conversationId]: []
    }));
  }
}
