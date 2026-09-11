import { Component, OnInit } from '@angular/core';

interface SearchItem{
  imgUrl: string;
  title: string;
  tag: string;
}

export interface MappedItem {
  url: string;
  title: string;
  tag?: string;
}

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.page.html',
  styleUrls: ['./search-box.page.scss'],
  standalone:false
})

export class SearchBoxPage implements OnInit {

  selectedTag: string = '#Trending';
  searchTerm: string = '';

  tags: string[] = [
    '#Trending',
    '#Fashion',
    '#Gaming',
    '#VibeCheck',
    '#TechLife',
    '#Photography'
  ];
  
  allItems: MappedItem[] = [];

  trends: SearchItem[] = [
    {imgUrl:'assets/search/trending/stone.avif', title:'Tushar Rathour', tag: '#Trending'},
    {imgUrl:'assets/search/trending/cubes.avif', title:'Shubham Dhage', tag: '#Trending'},
    {imgUrl:'assets/search/trending/flower.avif', title:'Clever visual', tag: '#Trending'},
    {imgUrl:'assets/search/trending/cloths.avif', title:'SKG Photography', tag: '#Trending'},
    {imgUrl:'assets/search/trending/cat.avif', title:'Shivam Mistry', tag: '#Trending'},
    {imgUrl:'assets/search/trending/building.avif', title:'Yong Chuan Tan', tag: '#Trending'},
    {imgUrl:'assets/search/trending/cars.avif', title:'Jaun Carlos', tag: '#Trending'},
    {imgUrl:'assets/search/trending/color.avif', title:'Reinaldo', tag: '#Trending'},
    {imgUrl:'assets/search/trending/trade.avif', title:'Vimal S', tag: '#Trending'}
  ];

  fashions: SearchItem[] = [
    {imgUrl:'assets/search/fashion/Dom_Hill.avif', title:'Dom Hill', tag: '#Fashion'},
    {imgUrl:'assets/search/fashion/Dwaynejoe.avif', title:'Dwayne Joe', tag: '#Fashion'},
    {imgUrl:'assets/search/fashion/freestocks.avif', title:'Free Stocks', tag: '#Fashion'},
    {imgUrl:'assets/search/fashion/GettyImages.avif', title:'Getty Images', tag: '#Fashion'},
    {imgUrl:'assets/search/fashion/hans.avif', title:'Hans', tag: '#Fashion'},
    {imgUrl:'assets/search/fashion/Katsiaryna.avif', title:'Katsiaryna', tag: '#Fashion'},
    {imgUrl:'assets/search/fashion/Morgane.avif', title:'Morgane', tag: '#Fashion'},
    {imgUrl:'assets/search/fashion/Roberta.avif', title:'Roberta', tag: '#Fashion'},
    {imgUrl:'assets/search/fashion/Mal.avif', title:'Malicki M Beser', tag: '#Fashion'}
  ];

  games: SearchItem[] = [    
    {imgUrl:'assets/search/game/AhmetKurt.avif', title:'Ahmet Kurt', tag: '#Gaming'},
    {imgUrl:'assets/search/game/Anastasemaragos.avif', title:'Anastase Maragos', tag: '#Gaming'},
    {imgUrl:'assets/search/game/Danielmaquiling.avif', title:'Daniel Maquiling', tag: '#Gaming'},
    {imgUrl:'assets/search/game/Florianolivo.avif', title:'Florian Olivo', tag: '#Gaming'},
    {imgUrl:'assets/search/game/Lorenzoherrera.avif', title:'Lorenzo Herrera', tag: '#Gaming'},
    {imgUrl:'assets/search/game/nickparkar.avif', title:'Nick Parkar', tag: '#Gaming'},
    {imgUrl:'assets/search/game/Nikkorba.avif', title:'Nik Korba', tag: '#Gaming'},
    {imgUrl:'assets/search/game/Ryanquintal.avif', title:'Ryan Quintal', tag: '#Gaming'},
    {imgUrl:'assets/search/game/Shaurya Sagar.avif', title:'Shaurya Sagar', tag: '#Gaming'}
  ];

  vibes: SearchItem[] = [
    {imgUrl:'assets/search/vibe/Danielefranchi.avif', title:'Daniele Franchi', tag: '#VibeCheck'},
    {imgUrl:'assets/search/vibe/Joaomacedo.avif', title:'Joao Macedo', tag: '#VibeCheck'},
    {imgUrl:'assets/search/vibe/Danielmonteiro.avif', title:'Daniel Monteiro', tag: '#VibeCheck'},
    {imgUrl:'assets/search/vibe/Dianaparkhouse.avif', title:'Diana Parkhouse', tag: '#VibeCheck'},
    {imgUrl:'assets/search/vibe/Aaronhuber.avif', title:'Aaron Huber', tag: '#VibeCheck'},
    {imgUrl:'assets/search/vibe/Gabriellaclaremarino.avif', title:'Gabriella Clare Marino', tag: '#VibeCheck'},
    {imgUrl:'assets/search/vibe/Gidonwessner.avif', title:'Gidon Wessner', tag: '#VibeCheck'}
  ];

  techs: SearchItem[] = [
    {imgUrl:'assets/search/tech/Alesnesetril.avif', title:'Alex Nesetril', tag: '#TechLife'},
    {imgUrl:'assets/search/tech/Alexandredebieve.avif', title:'Alexandre Debieve', tag: '#TechLife'},
    {imgUrl:'assets/search/tech/Alexknight.avif', title:'Alex knight', tag: '#TechLife'},
    {imgUrl:'assets/search/tech/Jjying.avif', title:'JJ Ying', tag: '#TechLife'},
    {imgUrl:'assets/search/tech/Gettyimages.avif', title:'Getty Images', tag: '#TechLife'},
    {imgUrl:'assets/search/tech/Getty_images.avif', title:'Getty Images', tag: '#TechLife'},
    {imgUrl:'assets/search/tech/Igoromilaev.avif', title:'Igor Omilaev', tag: '#TechLife'}
  ];

  photos: SearchItem[] = [
    {imgUrl:'assets/search/photo/Achosensoul.avif', title:'A Chosen Soul', tag: '#Photography'},
    {imgUrl:'assets/search/photo/Alexanderdummer.avif', title:'Alexander Dummer', tag: '#Photography'},
    {imgUrl:'assets/search/photo/Alifngoylung.avif', title:'Alif Ngoy Lung', tag: '#Photography'},
    {imgUrl:'assets/search/photo/Dariobronnimann.avif', title:'Dario Bronnimann', tag: '#Photography'},
    {imgUrl:'assets/search/photo/Emmaswoboda.avif', title:'Emma Swoboda', tag: '#Photography'},
    {imgUrl:'assets/search/photo/Jeremybishop.avif', title:'Jeremy Bishop', tag: '#Photography'},
    {imgUrl:'assets/search/photo/Jonnygios.avif', title:'Jonny Gios', tag: '#Photography'},
    {imgUrl:'assets/search/photo/Matthewsmith.avif', title:'Matthew Smith', tag: '#Photography'},
    {imgUrl:'assets/search/photo/Nicolasladinosilva.avif', title:'Nicolas Ladino Silva', tag: '#Photography'},
    {imgUrl:'assets/search/photo/Reinhartjulian.avif', title:'Rein Hart Julian', tag: '#Photography'}
  ];

  // Helper getter to unite all arrays into one source
  get masterList(): SearchItem[] {
    return [
      ...this.trends,
      ...this.fashions,
      ...this.games,
      ...this.vibes,
      ...this.techs,
      ...this.photos
    ];
  }

  constructor() { 
    this.allItems = this.trends.map(item => ({
      url: item.imgUrl,
      title: item.title,
      tag: item.tag
    }));
  }

  ngOnInit() {
    this.applyFilter();
  }

  selectTag(tag: string) {
    this.selectedTag = tag;    
    this.applyFilter();
  }

  onSearchChange(event: any){
    this.searchTerm = event.detail.value || '';
    this.applyFilter();
  }

  applyFilter(){
    let filtered = [...this.masterList];

    // 1. Filter by Tag (#Trending shows everything, or filter by specific tag)
    if (this.selectedTag !== '#Trending') {
      filtered = filtered.filter(item => item.tag === this.selectedTag);
    }

    // 2. Filter by Search Query (matches title or tags)
    if (this.searchTerm.trim() !== '') {
      const query = this.searchTerm.toLowerCase().trim();
      filtered = filtered.filter(item => {
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesTag = item.tag.toLowerCase().includes(query);
        return matchesTitle || matchesTag;
      });
    }

    // 3. Map filtered items into allItems (This updates your HTML grid!)
    this.allItems = filtered.map(item =>(
      {
        url: item.imgUrl,
        title: item.title,
        tag: item.tag
      }
    ))
  }

}
