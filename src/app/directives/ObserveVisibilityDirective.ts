import { Directive, ElementRef, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appIntersectionObserver]',
  standalone: false
})
export class ObserveVisibilityDirective implements OnInit, OnDestroy{
  
  @Output() isPercentVisible = new EventEmitter<boolean>();
  private observer!: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    const options: IntersectionObserverInit = {
      root: null, // Uses the viewport/Ionic scroll container
      threshold: 0.6 // Triggers exactly when 60% of the element is visible
    };

    this.observer = new IntersectionObserver(([entries]) => {
      // entry.isIntersecting is true when visibility >= 60%
      this.isPercentVisible.emit(entries.isIntersecting);
    }, options);

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

}
