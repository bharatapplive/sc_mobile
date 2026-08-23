import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonChip, IonLabel } from '@ionic/angular/standalone';
import { TrendingService } from '../../services/trending.service';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category-chips',
  templateUrl: './category-chips.component.html',
  styleUrls: ['./category-chips.component.scss'],
  standalone: true,
  imports: [CommonModule, IonChip, IonLabel],
})
export class CategoryChipsComponent implements OnInit {
  categories: Category[] = [];

  constructor(private trendingService: TrendingService) {}

  ngOnInit(): void {
    this.trendingService.getCategories().subscribe(cats => {
      this.categories = cats;
    });
  }

  selectCategory(id: string): void {
    this.trendingService.selectCategory(id);
  }
}
