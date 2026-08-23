import { Component, EventEmitter, Output } from '@angular/core';
import { IonSearchbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: true,
  imports: [IonSearchbar],
})
export class SearchBarComponent {
  @Output() searchChange = new EventEmitter<string>();

  onSearchInput(event: CustomEvent): void {
    this.searchChange.emit(event.detail.value ?? '');
  }
}
