import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BaseComponent } from './base/base.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BaseComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  ngOnInit() {}
}
