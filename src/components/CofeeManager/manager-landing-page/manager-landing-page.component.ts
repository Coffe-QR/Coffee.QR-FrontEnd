import { Component, OnInit } from '@angular/core'
import { User } from '../../../auth/model/user.model'
import { AuthService } from '../../../auth/auth.service'
import { EventService } from '../event.service'

@Component({
    selector: 'app-manager-landing-page',
    templateUrl: './manager-landing-page.component.html',
    styleUrl: './manager-landing-page.component.scss',
})
export class ManagerLandingPageComponent implements OnInit {
    user: User | undefined
    events: any[] = []

    constructor(
        private authService: AuthService,
        private eventService: EventService
    ) {}

    ngOnInit(): void {
        this.authService.user$.subscribe((user) => {
            this.user = user
        })

        this.eventService.getAllEvents().subscribe({
            next: (data) => {
                this.events = data
            },
            error: (err) => console.error('Failed to load events:', err),
        })
    }

    onLogout(): void {
        this.authService.logout()
    }
}
