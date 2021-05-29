import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  showHeroes = true;

  toggleHeroes() { this.showHeroes = !this.showHeroes; }
}
