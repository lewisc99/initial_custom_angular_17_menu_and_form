import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[dynamicTopPercentage]',
  standalone: true,
})
export class DynamicTopPercentageDirective implements OnInit {
  @Input() topPercentage: number = 55;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.style.top = `${this.topPercentage}%`;
  }
}
