import { Component, OnInit } from '@angular/core'
import { User } from '../../../auth/model/user.model'
import { AuthService } from '../../../auth/auth.service'

@Component({
    selector: 'app-it-support-landing-page',
    templateUrl: './it-support-landing-page.component.html',
    styleUrl: './it-support-landing-page.component.scss',
})
export class ItSupportLandingPageComponent implements OnInit {
    user: User | undefined

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.user$.subscribe((user) => {
            this.user = user
        })
    }

    onLogout(): void {
        this.authService.logout()
    }
}
