import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from './../../../auth/auth.service'

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
    backgroundImage: string = ''
    showLogin: boolean = true

    constructor(
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.authService.user$.subscribe((user) => {
            if (user.id != 0) {
                this.showLogin = false
            }
        })
    }

    login(): void {
        this.router.navigate(['/login'])
    }
}
