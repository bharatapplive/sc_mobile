import { Injectable, signal, computed } from '@angular/core';
import { Note } from '../models/note.model';
import { Conversation } from '../models/conversation.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private notesList = signal<Note[]>([
    {
      id: 1,
      username: 'Developer Note',
      avatar: 'assets/ai_img.png',
      isOwnNote: true,
      hasNote: false,
      altText: 'A professional studio portrait of a young creative person with a friendly expression'
    },
    {
      id: 2,
      username: 'Alex',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCB30wUaCekFFOOyq99O5RzkINj7s0Ppdt5CNyn2OyMQ4uxPuZNrCN7pb-fRunQ0EgNTmzqEZGckU9lqEtC1EZizfcLzlU_ynqpgazHLmfE2v3NWZXCSlS4AJW4IzpdVX7U5i3QlSH_BJ5pxk5hpYa_mg0Jeym8KqVAPs6vCZZx3IiShodN7-mAe9-3Adak2h3G2rnI9VspsnTkNS3Ae3-42COKJPGdbe5QyWh0minL5gjBNtQid_6aFTTxww9iLxZrWWBkGlpYh3A',
      hasStoryRing: true,
      altText: 'A vibrant close-up portrait of a woman with neon-toned lighting'
    },
    {
      id: 3,
      username: 'Jordan',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASSe0q_I3nQGm6IG5_4SYHVaXoJqyUZ-7DkmxJ-atU80MaQLBZF_apLuevRKtdaJ1QavISRfj9tCOP7YCuK6DZ1L19l4zSrb59cfsr6hb5KFDLd8amK9jl_DJ6c-ZjJbaax_obJPCRpfavN5J8pg1Ok9ODnMQ-ob0tRJoct42wScOZaPzAuF3QTu6GFZOX4CzmKK2OwNKyQO4pn4SwdLUuJOTyCuJOVlUqWqMD7tXLMuUehD1waeRM8DLxXPnP4JDqSW_kTKXzJGQ',
      hasStoryRing: true,
      altText: 'A candid lifestyle shot of a young man drinking coffee'
    },
    {
      id: 4,
      username: 'Mika',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAKIlAZIm4USU6hQhUsn_s1Nakjlpy63x8TVZzbQ8P9Nt1KcEtl3wyF7ObYnmPiKO_1wyaUvI_bsjtGbdbCz8_ZYwDPpKTIqSauobn_h9Nz3nKRwTLyKqkYyH1nQ8kgXljOEC06AzWrAtJMdNjip-HmdXCDQBvlkA6m6f4O1-CfO1mevBi9OU2kFM0Y5aOX0k3aCdKKrokDfbLA0tv4zW9HzjkddgpT9BwpPUqEUJ2a4Z795p2WhDj2Vhgi7Byh7dUxQjfm8mwtS-A',
      hasStoryRing: false,
      altText: 'Stylized artistic portrait of a person with colorful hair'
    },
    {
      id: 5,
      username: 'Sarah',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAA6Vnt3XNIokonC-HSjaOsi9v8nLZBEJj6qydnYuEoJ5G7_pgPWdsj5a6GYPiPt5JMVYhWZ4cOSd6Wosi6uGKseUoT4um5mVthekxhK1D7nclzhS1Ss9_fXP-UOzVC628Xu7zGLOGjo_2k_aQAMIw30t5xpSdh26aQNOJVf__z3erL073qMlJ92Xup8VWTa7OJHg3jiVN15NW8ua4AsnNVSszk9tX_UuVNhhqBjZ3HGXyl-HNwmytGHvCS_qO9jirwI8iJKGzcoYg',
      hasStoryRing: true,
      altText: 'Elegant close up of a young woman laughing'
    },
    {
      id: 6,
      username: 'Leo',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDEnKdoSYT-6bkn6c-qwL3Qq0qILtKrVanUdhUXFhPkHzzZTJwKhxLcHOdckjcb3Rr72e7OKObdzDxjbzV7ZTxxK9yHDgSbeKtg6JiPCeGJSmFqgCZr63vGgsS4DNOsruCncX3LldJU7q8IVQxtW7QW7ptlOY8zITAl9ZujjuUAx5Ph54aT_3zVTW4vy7V6xQWCN18uHdyVDkmA7C7wfWY5cWvB4RXap0G0xp-qX4E6-9YSrIiZApamaKRgVXqEuR1WDy2R3rT0q0',
      hasStoryRing: true,
      altText: 'Dynamic portrait of a male gamer'
    }
  ]);

  private conversationsList = signal<Conversation[]>([
    {
      id: 1,
      name: 'Ankush Jha',
      avatar: 'assets/ai_img.png',
      lastMessage: "I'm the developer of this App",
      time: 'Now',
      isOnline: true,
      unread: true,
      altText: 'A portrait of a male creative director'
    },
    {
      id: 2,
      name: 'Jordan Smith',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAM_yfzjQYPRrh5pfGistHa-YLXlSLsALZOXKONJ3grBFFqnrutKo3oHWRotqMI34Rom_atqrhl_odg_06m2ga_S0WUhVRvetcPTvp2iM-cyzvw0vfb46QJpBN2JsXFrusDM53BOHQ091mMlWEYtU2vVQonrY4rDpJFzNtZt-jsQADz6iyyGYLEQQQs7JBdH2wbfLkDcVPp0dVr_vxa51Wo2m7if3KtgYGLoR1XdSg7-LXGGlMnaBctIe56vEa9HCPJVQdMH3MPt1Q',
      lastMessage: 'That design you posted is absolutely fire!',
      time: '12m',
      isOnline: false,
      unread: false,
      altText: 'A young woman with braided hair'
    },
    {
      id: 3,
      name: 'Design Team 🎨',
      isGroup: true,
      avatars: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuArIbDwpvym7pD31bc9FA1PMQI3hM35HT-As8RXEJp5cY2MSv-HbVmhGdA4uKIRqL9QOMi4D5NzObaowzjARpGQ0dWVMyHRyY8Bzq3eWTp9kC6aGpekiA_fNCYABqirSjxgtG-6bXJqqQZQCywuyXQngh829Z2VKsCXX4Nn20NQtt_l7xcGEYON5L9XuDi6L1kb-iyoZhGiLpQoV7viafzFaHL-Z-oATrTh8YVA9TqUFftaF8yebE889FwEcQh6zNvbuqN1UCdeT-s',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBNN_Ibj69egwjbQFh2H2DKU7rRnxCA01Au9lZ0gV_jGa6zMsvWfqFAeqwBcKRZ_C1rsrZq3nMYqAXdws9lCEAE3uHkQJD-DCKGtDglDLPOQliG4VNmZTS-jw2waSW6pQzcKdgPZGHXDIzDOJl2igZAFRgi4hrDWXUhCE8nqJH8qQ0669IUP9hGlRMUUyDoAXYUOmHoe08To5pyGgVCuf7Tqo3b-fyuUR6k5wNEvJBVvYADJ0XUgI24OBkjEj9cdnHcMtm8nwSU_wI'
      ],
      senderName: 'Mika',
      lastMessage: 'Sending the final assets over now.',
      time: '1h',
      unread: false
    },
    {
      id: 4,
      name: 'Marcus Chen',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVTeF7TjfroLxJtf5ZcdLFyrrScEMa_BUu9yNhagpmlR01VxHhloSZOl9AbAC5XqES4dh4z5cqeAQWWcT4h-jKNsOc0lDBzw13jnORed6Aaae5ecFnra_HRm8uAzPHDmMo43Lq2X33o9J0Tgtmf0N46tnMnS-Ul3kGi9QsZiLIVKiEKI9tIskxd-AMEIKPzF0FsBMuX3VKGk7zJZ91Ob_ndVAVldq-nKfx7KS6EAEKo_VNj8LktMa5gZWtRYki36D68M5f26gWeZY',
      lastMessage: 'Thanks for the feedback on the prototype!',
      time: '3h',
      unread: false,
      altText: 'Headshot of a man with minimalist glasses'
    },
    {
      id: 5,
      name: 'Sarah Wilson',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUYjRbGlzaSCVr3U1q0ZI6I5H9LNHzTroXnQzv2O0GghYnzdXsUtD2b5qkreny83yWqyj_qXK7EMx2dEhvmbY0huNbC-sW5FUn4tRnL8Lg_G860HvvqIKN86FRjivcY39dveuQpNe7Ypth9hRD4g2w0z9PPGd08UF6JTyvH9WOitwH7Zwjk0zswX-MaLZhlyKU5sGdsFlR5wJuRzs19Km6oFJN0Qtptz4skP0aVLhi85yuUA-64bPgc6FPHQVdOLSuIIj6k0Lopzk',
      lastMessage: 'Sent a photo',
      time: 'Yesterday',
      unread: false,
      altText: 'Portrait of a cheerful woman wearing a yellow sweater'
    }
  ]);

  searchQuery = signal<string>('');
  requestsCount = signal<number>(4);

  notes = computed(() => this.notesList());

  filteredConversations = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) {
      return this.conversationsList();
    }
    return this.conversationsList().filter(conv =>
      conv.name.toLowerCase().includes(query) ||
      conv.lastMessage.toLowerCase().includes(query)
    );
  });

  setSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }
}
