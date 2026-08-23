export type TrendCardType = 'standard' | 'featured';

export interface TrendPost {
  id: string;
  imageUrl: string;
  imageAlt: string;
  username?: string;
  avatarUrl?: string;
  caption?: string;
  tag?: string;
  isFeatured?: boolean;
  isLiked?: boolean;
  isBookmarked?: boolean;
  cardType: TrendCardType;
}
