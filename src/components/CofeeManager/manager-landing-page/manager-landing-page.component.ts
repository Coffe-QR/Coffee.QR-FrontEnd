import { Component, OnInit } from '@angular/core'
import { User } from '../../../auth/model/user.model'
import { AuthService } from '../../../auth/auth.service'

@Component({
    selector: 'app-manager-landing-page',
    templateUrl: './manager-landing-page.component.html',
    styleUrl: './manager-landing-page.component.scss',
})
export class ManagerLandingPageComponent implements OnInit {
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
