import { Component, OnInit } from '@angular/core'
import { User } from '../../../auth/model/user.model'
import { AuthService } from '../../../auth/auth.service'

@Component({
    selector: 'app-bartender-landing-page',
    templateUrl: './bartender-landing-page.component.html',
    styleUrl: './bartender-landing-page.component.scss',
})
export class BartenderLandingPageComponent implements OnInit {
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
