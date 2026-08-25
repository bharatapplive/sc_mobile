import { Component, OnInit } from '@angular/core';

interface SearchItem {
  imgUrl: string;
  title: string;
  tag: string;
}

export interface MappedItem {
  url: string;
  title: string;
  tag?: string;
  isLiked?: boolean;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: false,
})
export class SearchPage implements OnInit {
  selectedTag: string = '#Trending';
  searchTerm: string = '';

  tags: string[] = [
    '#Trending',
    '#Fashion',
    '#Gaming',
    '#VibeCheck',
    '#TechLife',
    '#Photography',
  ];

  allItems: MappedItem[] = [];
  private loopIndex: number = 0;
  private PAGE_SIZE: number = 8;

  trends: SearchItem[] = [
    { imgUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80', title: 'Tushar Rathour', tag: '#Trending' },
    { imgUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80', title: 'Shubham Dhage', tag: '#Trending' },
    { imgUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80', title: 'Clever visual', tag: '#Trending' },
    { imgUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80', title: 'SKG Photography', tag: '#Trending' },
    { imgUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80', title: 'Shivam Mistry', tag: '#Trending' },
    { imgUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80', title: 'Yong Chuan Tan', tag: '#Trending' },
    { imgUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80', title: 'Jaun Carlos', tag: '#Trending' },
    { imgUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80', title: 'Reinaldo', tag: '#Trending' },
    { imgUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80', title: 'Vimal S', tag: '#Trending' }
  ];

  fashions: SearchItem[] = [
    { imgUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80', title: 'Dom Hill', tag: '#Fashion' },
    { imgUrl: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80', title: 'Dwayne Joe', tag: '#Fashion' },
    { imgUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80', title: 'Free Stocks', tag: '#Fashion' },
    { imgUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80', title: 'Getty Images', tag: '#Fashion' },
    { imgUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80', title: 'Hans', tag: '#Fashion' },
    { imgUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80', title: 'Katsiaryna', tag: '#Fashion' },
    { imgUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80', title: 'Morgane', tag: '#Fashion' },
    { imgUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80', title: 'Roberta', tag: '#Fashion' },
    { imgUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80', title: 'Malicki M Beser', tag: '#Fashion' }
  ];

  games: SearchItem[] = [
    { imgUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80', title: 'Ahmet Kurt', tag: '#Gaming' },
    { imgUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80', title: 'Anastase Maragos', tag: '#Gaming' },
    { imgUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80', title: 'Daniel Maquiling', tag: '#Gaming' },
    { imgUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80', title: 'Florian Olivo', tag: '#Gaming' },
    { imgUrl: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80', title: 'Lorenzo Herrera', tag: '#Gaming' },
    { imgUrl: 'https://images.unsplash.com/photo-1612287233207-6b45155f9397?auto=format&fit=crop&w=600&q=80', title: 'Nick Parkar', tag: '#Gaming' },
    { imgUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80', title: 'Nik Korba', tag: '#Gaming' },
    { imgUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80', title: 'Ryan Quintal', tag: '#Gaming' },
    { imgUrl: 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?auto=format&fit=crop&w=600&q=80', title: 'Shaurya Sagar', tag: '#Gaming' }
  ];

  vibes: SearchItem[] = [
    { imgUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=600&q=80', title: 'Daniele Franchi', tag: '#VibeCheck' },
    { imgUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80', title: 'Joao Macedo', tag: '#VibeCheck' },
    { imgUrl: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=600&q=80', title: 'Daniel Monteiro', tag: '#VibeCheck' },
    { imgUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80', title: 'Diana Parkhouse', tag: '#VibeCheck' },
    { imgUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80', title: 'Aaron Huber', tag: '#VibeCheck' },
    { imgUrl: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=600&q=80', title: 'Gabriella Clare Marino', tag: '#VibeCheck' },
    { imgUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80', title: 'Gidon Wessner', tag: '#VibeCheck' }
  ];

  techs: SearchItem[] = [
    { imgUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80', title: 'Alex Nesetril', tag: '#TechLife' },
    { imgUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80', title: 'Alexandre Debieve', tag: '#TechLife' },
    { imgUrl: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=600&q=80', title: 'Alex knight', tag: '#TechLife' },
    { imgUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=600&q=80', title: 'JJ Ying', tag: '#TechLife' },
    { imgUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80', title: 'Getty Images', tag: '#TechLife' },
    { imgUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80', title: 'Getty Images Tech', tag: '#TechLife' },
    { imgUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80', title: 'Igor Omilaev', tag: '#TechLife' }
  ];

  photos: SearchItem[] = [
    { imgUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80', title: 'A Chosen Soul', tag: '#Photography' },
    { imgUrl: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=600&q=80', title: 'Alexander Dummer', tag: '#Photography' },
    { imgUrl: 'https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?auto=format&fit=crop&w=600&q=80', title: 'Alif Ngoy Lung', tag: '#Photography' },
    { imgUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80', title: 'Dario Bronnimann', tag: '#Photography' },
    { imgUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80', title: 'Emma Swoboda', tag: '#Photography' },
    { imgUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=600&q=80', title: 'Jeremy Bishop', tag: '#Photography' },
    { imgUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80', title: 'Jonny Gios', tag: '#Photography' },
    { imgUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80', title: 'Matthew Smith', tag: '#Photography' },
    { imgUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80', title: 'Nicolas Ladino Silva', tag: '#Photography' },
    { imgUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=600&q=80', title: 'Rein Hart Julian', tag: '#Photography' }
  ];

  get masterList(): SearchItem[] {
    return [
      ...this.trends,
      ...this.fashions,
      ...this.games,
      ...this.vibes,
      ...this.techs,
      ...this.photos,
    ];
  }

  ngOnInit() {
    this.applyFilter();
  }

  selectTag(tag: string) {
    this.selectedTag = tag;
    this.loopIndex = 0;
    this.applyFilter();
  }

  onSearchChange(event: any) {
    this.searchTerm = (event?.detail?.value || '').trim();
    this.loopIndex = 0;
    this.applyFilter();
  }

  private getFilteredPool(): SearchItem[] {
    let filtered = [...this.masterList];

    if (this.selectedTag !== '#Trending') {
      filtered = filtered.filter((item) => item.tag === this.selectedTag);
    }

    if (this.searchTerm !== '') {
      const query = this.searchTerm.toLowerCase();
      filtered = filtered.filter((item) => {
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesTag = item.tag.toLowerCase().includes(query);
        return matchesTitle || matchesTag;
      });
    }

    return filtered;
  }

  applyFilter() {
    this.loopIndex = 0;
    const pool = this.getFilteredPool();
    this.allItems = pool.map((item) => ({
      url: item.imgUrl,
      title: item.title,
      tag: item.tag,
      isLiked: false,
    }));
  }

  loadMore(event: any) {
    setTimeout(() => {
      const pool = this.getFilteredPool();
      if (pool.length > 0) {
        // Append next batch by looping back over the pool if needed
        for (let i = 0; i < this.PAGE_SIZE; i++) {
          this.loopIndex++;
          const nextItem = pool[this.loopIndex % pool.length];
          this.allItems.push({
            url: nextItem.imgUrl,
            title: nextItem.title,
            tag: nextItem.tag,
            isLiked: false,
          });
        }
      }
      event?.target?.complete();
    }, 500);
  }

  handleRefresh(event: any) {
    this.applyFilter();
    setTimeout(() => {
      event?.target?.complete();
    }, 300);
  }

  toggleFavorite(item: MappedItem) {
    item.isLiked = !item.isLiked;
  }
}