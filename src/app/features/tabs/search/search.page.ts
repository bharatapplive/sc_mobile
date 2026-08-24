import { Component } from '@angular/core';

export interface CategoryItem {
  id: string;
  name: string;
  icon?: string;
}

export interface TrendCard {
  image: string;
  title: string;
  tag?: string;
  badge?: string;
  isLive?: boolean;
}

export interface TrendData {
  tall: TrendCard;
  short: TrendCard;
  medium: TrendCard;
  banner: TrendCard;
  bottomLeft: TrendCard;
  bottomRight: TrendCard;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: false,
})
export class SearchPage {
  searchQuery: string = '';
  selectedCategory: string = 'trending';

  categories: CategoryItem[] = [
    { id: 'trending', name: 'Trending', icon: 'flame' },
    { id: 'fashion', name: 'Fashion', icon: 'shirt-outline' },
    { id: 'gaming', name: 'Gaming', icon: 'game-controller-outline' },
    { id: 'art', name: 'Art & Design', icon: 'color-palette-outline' },
    { id: 'nightlife', name: 'Nightlife', icon: 'moon-outline' },
    { id: 'music', name: 'Live & Music', icon: 'musical-notes-outline' },
  ];

  private categoryTrends: Record<string, TrendData> = {
    trending: {
      tall: {
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
        title: 'Cyberpunk Tokyo Fashion Week',
        tag: '#Fashion',
      },
      short: {
        image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80',
        title: 'Neon Battlestation',
        tag: '#Gaming',
      },
      medium: {
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
        title: 'Generative Liquid 3D Art',
        tag: '#Art',
      },
      banner: {
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
        title: 'Midnight Underground Soundwave',
        badge: 'LIVE NOW',
        isLive: true,
      },
      bottomLeft: {
        image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
        title: 'Hidden Tokyo Alleyways',
        tag: '#Nightlife',
      },
      bottomRight: {
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
        title: 'Social Circle VIP Lounge',
        tag: '#Exclusive',
      },
    },
    fashion: {
      tall: {
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
        title: 'Avant-Garde Streetwear 2026',
        tag: '#Style',
      },
      short: {
        image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80',
        title: 'Haute Couture Runway',
        tag: '#Runway',
      },
      medium: {
        image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
        title: 'Digital Wearables & Fabrics',
        tag: '#3DFashion',
      },
      banner: {
        image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80',
        title: 'Global Fashion Week Broadcast',
        badge: 'STREAMING',
        isLive: true,
      },
      bottomLeft: {
        image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80',
        title: 'Urban Street Style Looks',
        tag: '#Urban',
      },
      bottomRight: {
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
        title: 'Cyberpunk Aesthetic Drops',
        tag: '#Drop',
      },
    },
    gaming: {
      tall: {
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
        title: 'Ultimate Esports Arena Finals',
        tag: '#Esports',
      },
      short: {
        image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=800&q=80',
        title: 'Next-Gen VR Mechanics',
        tag: '#VR',
      },
      medium: {
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
        title: 'Retro Arcade Culture Revival',
        tag: '#Retro',
      },
      banner: {
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
        title: 'World Championship Finals',
        badge: 'LIVE MATCH',
        isLive: true,
      },
      bottomLeft: {
        image: 'https://images.unsplash.com/photo-1612287233207-6b45155f9397?auto=format&fit=crop&w=800&q=80',
        title: 'Gamer Community Meetup',
        tag: '#Community',
      },
      bottomRight: {
        image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
        title: 'Esports Team Merch Reveal',
        tag: '#Merch',
      },
    },
    art: {
      tall: {
        image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
        title: 'Hyper-Realistic 3D Sculpting',
        tag: '#3DArt',
      },
      short: {
        image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
        title: 'Digital Textile Design',
        tag: '#Design',
      },
      medium: {
        image: 'https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?auto=format&fit=crop&w=800&q=80',
        title: 'Street Art & Murals',
        tag: '#Graffiti',
      },
      banner: {
        image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80',
        title: 'Virtual Gallery Live Tour',
        badge: 'GALLERY LIVE',
        isLive: true,
      },
      bottomLeft: {
        image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80',
        title: 'Creator Spotlight Exhibition',
        tag: '#Exhibition',
      },
      bottomRight: {
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
        title: 'Concept Art for Sci-Fi Worlds',
        tag: '#Concept',
      },
    },
    nightlife: {
      tall: {
        image: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?auto=format&fit=crop&w=800&q=80',
        title: 'Secret Speakeasy & Night Bars',
        tag: '#Cocktails',
      },
      short: {
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
        title: 'Rooftop Midnight Lounge',
        tag: '#Rooftop',
      },
      medium: {
        image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
        title: 'Neon Light Installations',
        tag: '#Lights',
      },
      banner: {
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
        title: 'Midnight DJ Festival Stream',
        badge: 'LIVE NOW',
        isLive: true,
      },
      bottomLeft: {
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
        title: 'Night Out Street Fashion',
        tag: '#NightStyle',
      },
      bottomRight: {
        image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=800&q=80',
        title: 'Late Night Gaming Lounges',
        tag: '#GamingBar',
      },
    },
    music: {
      tall: {
        image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
        title: 'Underground Electronic Beats',
        tag: '#Music',
      },
      short: {
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
        title: 'Synthwave & Lo-Fi Beats',
        tag: '#Beats',
      },
      medium: {
        image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
        title: 'Visual Audio Synthesis',
        tag: '#Audiovisual',
      },
      banner: {
        image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=1200&q=80',
        title: 'Acoustic Sessions in Central Park',
        badge: 'LIVE CONCERT',
        isLive: true,
      },
      bottomLeft: {
        image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80',
        title: 'Acoustic Jam Sessions',
        tag: '#Indie',
      },
      bottomRight: {
        image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
        title: 'Festival Stage Wear Trends',
        tag: '#Festival',
      },
    },
  };

  get activeTrend(): TrendData {
    return this.categoryTrends[this.selectedCategory] || this.categoryTrends['trending'];
  }

  selectCategory(id: string) {
    this.selectedCategory = id;
  }

  onSearchChange(event: any) {
    this.searchQuery = (event?.detail?.value || '').trim();
  }
}
