import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

interface DiscoverPerson {
  username: string;
  name: string;
  description: string;
  avatar: string;
  followed: boolean;
}

interface DiscoverPost {
  image: string;
  description: string;
  tags: string;
}

interface TrendingTag {
  name: string;
  count: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
  
export class SearchPage {
  query = '';
  category = 'All';
  readonly categories = ['All', 'People', 'Posts', 'Hashtags'];
  readonly people: DiscoverPerson[] = [
    { username: 'creative_soul', name: 'Riya Sharma', description: 'Digital creator', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200', followed: false },
    { username: 'apex_editor', name: 'Kabir Mehta', description: 'Photographer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200', followed: false },
    { username: 'travel_joy', name: 'Meera Iyer', description: 'Traveller', avatar: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200', followed: false },
    { username: 'luna.art', name: 'Arjun Mehta', description: 'Artist', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200', followed: false },
  ];
  readonly tags: TrendingTag[] = [
    { name: '#DigitalArt', count: '24.6K posts' },
    { name: '#TravelVibes', count: '18.2K posts' },
    { name: '#Photography', count: '15.8K posts' },
    { name: '#CollegeLife', count: '12.4K posts' },
  ];
  readonly posts: DiscoverPost[] = [
    { image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=600', description: 'City architecture', tags: 'architecture city design' },
    { image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600', description: 'Mountain escape', tags: 'travel nature outdoors' },
    { image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600', description: 'Mumbai at dusk', tags: 'mumbai photography city' },
    { image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600', description: 'A quiet beach', tags: 'travel beach nature' },
    { image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600', description: 'Creative workspace', tags: 'design creative workspace' },
    { image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600', description: 'Friends together', tags: 'friends college life' },
    { image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600', description: 'A scenic road trip', tags: 'travel vibes photography' },
    { image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600', description: 'Golden hour outdoors', tags: 'travel nature photography' },
    { image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600', description: 'Portrait in the sun', tags: 'portrait photography' },
    { image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600', description: 'A candid moment', tags: 'portrait creative' },
  ];

  get filteredPeople(): DiscoverPerson[] {
    const query = this.query.trim().toLowerCase();
    return this.people.filter((person) =>
      `${person.username} ${person.name} ${person.description}`.toLowerCase().includes(query),
    );
  }

  get filteredPosts(): DiscoverPost[] {
    const query = this.query.trim().replace(/^#/, '').toLowerCase();
    return this.posts.filter((post) =>
      `${post.description} ${post.tags}`.toLowerCase().includes(query),
    );
  }

  get filteredTags(): TrendingTag[] {
    const query = this.query.trim().replace(/^#/, '').toLowerCase();
    return this.tags.filter((tag) => tag.name.toLowerCase().includes(query));
  }

  selectCategory(category: string): void {
    this.category = category;
  }

  selectTag(tag: string): void {
    this.category = 'Hashtags';
    this.query = tag;
  }

  toggleFollow(person: DiscoverPerson): void {
    person.followed = !person.followed;
  }
}