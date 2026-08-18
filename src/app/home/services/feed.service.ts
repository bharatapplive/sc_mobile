import { Injectable ,Input } from "@angular/core";
import { Post } from "../models/feed.model";

@Injectable({
    providedIn: 'root'
})

export class FeedService {
    @Input() posts: Post[] = [
    {
      id: 1,
      author: {
        name: 'ankush.ooo7',
        avatarUrl: 'assets/ai_img.png',
        location: 'Uttarakhand ,',
        hasStory: true
      },
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmLGb7vfQlCMYgMw6_dxjvV2S8n602NQnJurBCYkF-DUmasGuXouXqcig2gD33CiP5P9RL2S_zzbgDwVW-gMW99qYRADXXqh6tcoRcl_1T5vdpNQzL_U-wlEB-Hvpia3eq4wdN5tdn2wQpmlz8CGD2FYCv0HGD9W7PlMAU8J50CoVcXpykmG4SByutTHKxjgeb7YUO_Otnn2KBTmMwB8hy_YtW8g92nz6JZWKP2RAk5gtXbmpFIH1HxNDyi6KkN8z8FRSApGpHcCU',
      likes: 1284,
      isLiked: false,
      isBookmarked: false,
      caption: 'Exploring the boundaries of digital reality today. This installation in Tokyo is pure magic. ✨ #DigitalArt #TokyoVibes',
      commentCount: 42,
      timeAgo: '2 hours ago'
    },
    {
      id: 2,
      author: {
        name: 'future_lab',
        avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpwSARHPUj9B8rnLHn0UsQjiUvjJNAiijZ_YIligpioUtNcHwtIQwIRGYT5f6h1QSavbS7_m9yrz-RPwi4oecXoxJJtUelptoa0YhT-A_mtTJ1IMWRW0GSZ7nOx9Ao-L6dZK559vNiQZqtyzH9Q3ns8GgEvXw0Ft2Ob9HVlg7m_W77wuuXf64cTwOuX6crbvSnSOapByoGELjTPc2xcPLXIehPL8LIsGzfGbKLwYMKhqydQn_BSS_7_w5NRfcJr9QXbpJEdjMonn0',
        location: 'San Francisco',
        hasStory: false
      },
      interactiveOverlay: {
        title: 'Generative Flow v1.0',
        subtitle: 'Live interaction enabled'
      },
      likes: 3490,
      isLiked: true,
      isBookmarked: false,
      caption: 'Dropping our new interactive shader experiment. The way it reacts to sound frequencies is just... wow. 🌊💜 #GenerativeArt #WebGL',
      commentCount: 128,
      timeAgo: '5 hours ago',
      aspectRatio: '4/5'
    },
    {
      id: 3,
      author: {
        name: 'zen_explorer',
        avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFpqmxphnWGMH7T_9ULeKQhIRo-edB5Ko9VyVSbW4dnj3LoEDiqe5tATiYiyC1oFCg2ZbFeywm294e7t4vEWNjerFN1MeiFjODhduOGQ8g9KnMtBTN1c8ORe6PAll4kSgw4HVUClGD8DApJ5aycBt81Y7iuVj7PaehgOO3smCcI84czZ0sHLUTHcpaJBqofm_2lZVtsJcGo1jKVFnV5DmfYfqq_K86dICY5A7eB4320I9zYHdRe1jychL0h-HHSYoatmorEov6HdQ',
        location: 'Iceland',
        hasStory: true
      },
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsWBVJPlrQGM44JrCYJvROiMwcleZ4Z1X_InBV0T2QJPpl1AXzXhzLbrZX33Am4f5hSfuxU_l2lyFuios0OD8p-8SHDElmmTJE4TeejidYZXE0RX_khNTFEiHkDjE6bxDRIJihLNVSi9k8FKc-lu1kLuk6Tsv0zzgMhNwjhAuSqi9huled7w03ITPC3MLHRYP2PGPeZGfwersBOml-a7FX9IVJF1hKd29nvbcIXEH-BeF2-G5jZpG7iEfK7UQi7f7EBxly17w4VzQ',
      likes: 821,
      isLiked: false,
      isBookmarked: false,
      caption: 'Cold air, clear mind. 🏔️',
      commentCount: 12,
      timeAgo: '9 hours ago'
    },
    {
      id: 3,
      author: {
        name: 'zen_explorer',
        avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFpqmxphnWGMH7T_9ULeKQhIRo-edB5Ko9VyVSbW4dnj3LoEDiqe5tATiYiyC1oFCg2ZbFeywm294e7t4vEWNjerFN1MeiFjODhduOGQ8g9KnMtBTN1c8ORe6PAll4kSgw4HVUClGD8DApJ5aycBt81Y7iuVj7PaehgOO3smCcI84czZ0sHLUTHcpaJBqofm_2lZVtsJcGo1jKVFnV5DmfYfqq_K86dICY5A7eB4320I9zYHdRe1jychL0h-HHSYoatmorEov6HdQ',
        location: 'Iceland',
        hasStory: true
      },
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsWBVJPlrQGM44JrCYJvROiMwcleZ4Z1X_InBV0T2QJPpl1AXzXhzLbrZX33Am4f5hSfuxU_l2lyFuios0OD8p-8SHDElmmTJE4TeejidYZXE0RX_khNTFEiHkDjE6bxDRIJihLNVSi9k8FKc-lu1kLuk6Tsv0zzgMhNwjhAuSqi9huled7w03ITPC3MLHRYP2PGPeZGfwersBOml-a7FX9IVJF1hKd29nvbcIXEH-BeF2-G5jZpG7iEfK7UQi7f7EBxly17w4VzQ',
      likes: 821,
      isLiked: false,
      isBookmarked: false,
      caption: 'Cold air, clear mind. 🏔️',
      commentCount: 12,
      timeAgo: '9 hours ago'
    },
  ];

  getPosts(): Post[] {
    return this.posts
  }
}