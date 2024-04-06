import { Component, OnInit } from '@angular/core';
import { slideInAnimation, fadeDownAnimation } from './route-animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [fadeDownAnimation],
})
export class AppComponent implements OnInit {
  title = 'Coffee.QR';
  public isMobileDevice: boolean = false;

  backgroundImage: string = './assets/landing1.jpg';
  ngOnInit() {
    if (window.innerWidth < 768) {
      // Option 1: Redirect
      this.isMobileDevice = true;
    }
  }

  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
