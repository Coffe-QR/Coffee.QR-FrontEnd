import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private router: Router) {}

  backgroundImage: string = '';

  ngOnInit() {
    const backgrounds = [
      './assets/landing1.jpg',
      './assets/landing2.jpg',
      './assets/landing3.jpg',
    ];

    // Shuffle the array
    this.shuffleArray(backgrounds);

    // Always select the first image after shuffling
    this.backgroundImage = backgrounds[0];
  }

  shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  }
}
