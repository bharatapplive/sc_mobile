import { Component, OnInit } from '@angular/core';

export interface ExploreItem {
  id: string;
  imgUrl: string;
  title: string;
  tag: string;
  avatar?: string;
  likes: string;
  isLiked?: boolean;
  isReel?: boolean;
  views?: string;
  aspect: 'tall' | 'square' | 'wide';
}

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: false,
})
export class SearchPage implements OnInit {
  selectedTag: string = 'Trending';
  searchTerm: string = '';
  isSearching: boolean = false;
  selectedItem: ExploreItem | null = null;
  isPreviewOpen: boolean = false;

  tags: { label: string; icon: string; name: string }[] = [
    { name: 'Trending', label: 'Trending', icon: 'flame' },
    { name: 'Fashion', label: 'Fashion', icon: 'shirt' },
    { name: 'Gaming', label: 'Gaming', icon: 'game-controller' },
    { name: 'VibeCheck', label: 'Vibe Check', icon: 'sparkles' },
    { name: 'TechLife', label: 'Tech Life', icon: 'hardware-chip' },
    { name: 'Photography', label: 'Photography', icon: 'camera' },
  ];

  recentSearches: string[] = [
    'Cyberpunk setups',
    'Street style 2026',
    'Minimalist architecture',
    'Indie game dev',
  ];

  allItems: ExploreItem[] = [];
  leftColumn: ExploreItem[] = [];
  rightColumn: ExploreItem[] = [];

  masterList: ExploreItem[] = [
    // Trending
    {
      id: 't1',
      imgUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
      title: 'Tushar Rathour',
      tag: 'Trending',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      likes: '4.8K',
      aspect: 'tall',
      isReel: true,
      views: '62K'
    },
    {
      id: 't2',
      imgUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
      title: 'Shubham Dhage',
      tag: 'Trending',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
      likes: '1.2K',
      aspect: 'square'
    },
    {
      id: 't3',
      imgUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80',
      title: 'Clever visual',
      tag: 'Trending',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      likes: '3.4K',
      aspect: 'wide'
    },
    {
      id: 't4',
      imgUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
      title: 'SKG Photography',
      tag: 'Trending',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      likes: '9.1K',
      aspect: 'tall',
      isReel: true,
      views: '110K'
    },
    {
      id: 't5',
      imgUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
      title: 'Shivam Mistry',
      tag: 'Trending',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80',
      likes: '2.3K',
      aspect: 'square'
    },
    {
      id: 't6',
      imgUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
      title: 'Yong Chuan Tan',
      tag: 'Trending',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      likes: '890',
      aspect: 'tall'
    },
    {
      id: 't7',
      imgUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
      title: 'Juan Carlos',
      tag: 'Trending',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      likes: '5.6K',
      aspect: 'wide'
    },
    {
      id: 't8',
      imgUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80',
      title: 'Reinaldo',
      tag: 'Trending',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
      likes: '7.8K',
      aspect: 'square',
      isReel: true,
      views: '45K'
    },

    // Fashion
    {
      id: 'f1',
      imgUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
      title: 'Dom Hill',
      tag: 'Fashion',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80',
      likes: '3.1K',
      aspect: 'tall'
    },
    {
      id: 'f2',
      imgUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80',
      title: 'Dwayne Joe',
      tag: 'Fashion',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      likes: '2.5K',
      aspect: 'square'
    },
    {
      id: 'f3',
      imgUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
      title: 'Aura Studio',
      tag: 'Fashion',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      likes: '6.9K',
      aspect: 'tall',
      isReel: true,
      views: '88K'
    },
    {
      id: 'f4',
      imgUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      title: 'Katsiaryna',
      tag: 'Fashion',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      likes: '4.2K',
      aspect: 'square'
    },
    {
      id: 'f5',
      imgUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80',
      title: 'Morgane Couture',
      tag: 'Fashion',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
      likes: '1.8K',
      aspect: 'wide'
    },

    // Gaming
    {
      id: 'g1',
      imgUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80',
      title: 'Ahmet Kurt',
      tag: 'Gaming',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      likes: '8.4K',
      aspect: 'tall',
      isReel: true,
      views: '124K'
    },
    {
      id: 'g2',
      imgUrl: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80',
      title: 'Lorenzo Herrera',
      tag: 'Gaming',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
      likes: '3.9K',
      aspect: 'square'
    },
    {
      id: 'g3',
      imgUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80',
      title: 'Nik Korba',
      tag: 'Gaming',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80',
      likes: '5.1K',
      aspect: 'wide'
    },
    {
      id: 'g4',
      imgUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
      title: 'Ryan Quintal',
      tag: 'Gaming',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      likes: '6.7K',
      aspect: 'tall',
      isReel: true,
      views: '93K'
    },
    {
      id: 'g5',
      imgUrl: 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=600&q=80',
      title: 'Shaurya Sagar',
      tag: 'Gaming',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      likes: '2.1K',
      aspect: 'tall'
    },

    // VibeCheck
    {
      id: 'v1',
      imgUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=600&q=80',
      title: 'Daniele Franchi',
      tag: 'VibeCheck',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      likes: '4.5K',
      aspect: 'square'
    },
    {
      id: 'v2',
      imgUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
      title: 'Joao Macedo',
      tag: 'VibeCheck',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      likes: '7.3K',
      aspect: 'tall',
      isReel: true,
      views: '142K'
    },
    {
      id: 'v3',
      imgUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80',
      title: 'Aaron Huber',
      tag: 'VibeCheck',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
      likes: '3.8K',
      aspect: 'wide'
    },

    // TechLife
    {
      id: 'tc1',
      imgUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
      title: 'Alex Nesetril',
      tag: 'TechLife',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      likes: '9.4K',
      aspect: 'tall',
      isReel: true,
      views: '180K'
    },
    {
      id: 'tc2',
      imgUrl: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=600&q=80',
      title: 'Alex Knight',
      tag: 'TechLife',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80',
      likes: '5.2K',
      aspect: 'square'
    },
    {
      id: 'tc3',
      imgUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80',
      title: 'JJ Ying Dev',
      tag: 'TechLife',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      likes: '4.6K',
      aspect: 'tall'
    },

    // Photography
    {
      id: 'p1',
      imgUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
      title: 'A Chosen Soul',
      tag: 'Photography',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      likes: '6.2K',
      aspect: 'tall',
      isReel: true,
      views: '97K'
    },
    {
      id: 'p2',
      imgUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=600&q=80',
      title: 'Alexander Dummer',
      tag: 'Photography',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      likes: '3.1K',
      aspect: 'square'
    },
    {
      id: 'p3',
      imgUrl: 'https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?auto=format&fit=crop&w=600&q=80',
      title: 'Alif Ngoy Lung',
      tag: 'Photography',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
      likes: '5.9K',
      aspect: 'wide'
    }
  ];

  ngOnInit() {
    this.applyFilter();
  }

  selectTag(tag: string) {
    this.selectedTag = tag;
    this.applyFilter();
  }

  onSearchFocus() {
    this.isSearching = true;
  }

  onSearchBlur() {
    // Delay slightly to allow tap on suggestions
    setTimeout(() => {
      if (!this.searchTerm) {
        this.isSearching = false;
      }
    }, 200);
  }

  onSearchChange(event: any) {
    this.searchTerm = (event?.detail?.value || '').trim();
    this.applyFilter();
  }

  clearSearch() {
    this.searchTerm = '';
    this.isSearching = false;
    this.applyFilter();
  }

  applyRecentSearch(term: string) {
    this.searchTerm = term;
    this.isSearching = false;
    this.applyFilter();
  }

  private getFilteredPool(): ExploreItem[] {
    let filtered = [...this.masterList];

    if (this.selectedTag !== 'Trending') {
      filtered = filtered.filter((item) => item.tag === this.selectedTag);
    }

    if (this.searchTerm) {
      const query = this.searchTerm.toLowerCase();
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(query) ||
        item.tag.toLowerCase().includes(query)
      );
    }

    return filtered;
  }

  applyFilter() {
    this.allItems = this.getFilteredPool();
    this.distributeColumns();
  }

  private distributeColumns() {
    this.leftColumn = [];
    this.rightColumn = [];

    this.allItems.forEach((item, index) => {
      if (index % 2 === 0) {
        this.leftColumn.push(item);
      } else {
        this.rightColumn.push(item);
      }
    });
  }

  toggleFavorite(event: Event, item: ExploreItem) {
    event.stopPropagation();
    item.isLiked = !item.isLiked;
  }

  openPreview(item: ExploreItem) {
    this.selectedItem = item;
    this.isPreviewOpen = true;
  }

  closePreview() {
    this.isPreviewOpen = false;
    this.selectedItem = null;
  }

  loadMore(event: any) {
    setTimeout(() => {
      const pool = this.getFilteredPool();
      if (pool.length > 0) {
        const moreItems = pool.slice(0, 6).map((item, idx) => ({
          ...item,
          id: `${item.id}_${Date.now()}_${idx}`,
          isLiked: false
        }));
        this.allItems = [...this.allItems, ...moreItems];
        this.distributeColumns();
      }
      event?.target?.complete();
    }, 600);
  }

  handleRefresh(event: any) {
    this.applyFilter();
    setTimeout(() => {
      event?.target?.complete();
    }, 400);
  }
}