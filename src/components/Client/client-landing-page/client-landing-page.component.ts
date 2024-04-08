import { Component, OnInit } from '@angular/core'
import { User } from '../../../auth/model/user.model'
import { AuthService } from '../../../auth/auth.service'

@Component({
    selector: 'app-client-landing-page',
    templateUrl: './client-landing-page.component.html',
    styleUrl: './client-landing-page.component.scss',
})
export class ClientLandingPageComponent implements OnInit {
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
