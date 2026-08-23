import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { TrendingService } from '../../services/trending.service';
import { TrendPost } from '../../models/trend.model';
import { TrendCardComponent } from '../trend-card/trend-card.component';
import { FeaturedCardComponent } from '../featured-card/featured-card.component';

@Component({
  selector: 'app-trending-grid',
  templateUrl: './trending-grid.component.html',
  styleUrls: ['./trending-grid.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TrendCardComponent,
    FeaturedCardComponent,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  ],
})
export class TrendingGridComponent implements OnInit {
  posts: TrendPost[] = [];

  constructor(private trendingService: TrendingService) {}

  ngOnInit(): void {
    this.trendingService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  /** Infinite scroll handler – ready for backend pagination */
  loadMore(event: CustomEvent): void {
    // TODO: fetch next page from backend, then:
    setTimeout(() => {
      (event.target as HTMLIonInfiniteScrollElement).complete();
    }, 1000);
  }
}
