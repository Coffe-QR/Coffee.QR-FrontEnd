import { Component, OnInit } from '@angular/core'
import { slideInAnimation } from './route-animations'
import { RouterOutlet } from '@angular/router'
import { AuthService } from '../auth/auth.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
    title = 'Coffee.QR'
    public isMobileDevice: boolean = false

    constructor(private authService: AuthService) {}

    backgroundImage: string = './assets/landing1.jpg'
    ngOnInit() {
        if (window.innerWidth < 768) {
            // Option 1: Redirect
            this.isMobileDevice = true
        }
        const jwt = localStorage.getItem('jwt')
        if (jwt !== null) {
            const decodeJwt = this.authService.decodeToken(jwt)
            this.authService.user$.next({
                username: decodeJwt.username,
                id: Number(decodeJwt.id),
                role: decodeJwt.role,
            })
        }
    }

    prepareRoute(outlet: RouterOutlet) {
        return (
            outlet &&
            outlet.activatedRouteData &&
            outlet.activatedRouteData['animation']
        )
    }
}
