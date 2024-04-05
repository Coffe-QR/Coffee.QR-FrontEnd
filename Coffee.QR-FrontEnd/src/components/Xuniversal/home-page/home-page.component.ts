import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  backgroundImage: string = '';

  ngOnInit() {
    const backgrounds = [
      './assets/landing1.jpg',
      './assets/landing2.jpg',
      './assets/landing3.jpg',
    ];
    // Select a random background image
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    this.backgroundImage = backgrounds[randomIndex];
  }
}
