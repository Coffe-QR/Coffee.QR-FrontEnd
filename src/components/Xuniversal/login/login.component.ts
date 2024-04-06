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

  // ngOnInit() {
  //   const backgrounds = [
  //     './assets/landing1.jpg',
  //     './assets/landing2.jpg',
  //     './assets/landing3.jpg',
  //   ];

  //   this.preloadImages(backgrounds);
  //   // Select a random background image
  //   const randomIndex = Math.floor(Math.random() * backgrounds.length);
  //   this.backgroundImage = backgrounds[randomIndex];
  // }

  // preloadImages(imageArray: string[]) {
  //   imageArray.forEach((image) => {
  //     const img = new Image();
  //     img.src = image;
  //   });
  // }
}
