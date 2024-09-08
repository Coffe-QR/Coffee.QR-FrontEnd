import { Component, OnInit } from '@angular/core'
import { User } from '../../../auth/model/user.model'
import { AuthService } from '../../../auth/auth.service'
import { NotificationService } from '../../Xuniversal/notification.service'
import { LocalUserService } from '../../Xuniversal/local-user.service'
import { Router } from '@angular/router'

@Component({
    selector: 'app-bartender-landing-page',
    templateUrl: './bartender-landing-page.component.html',
    styleUrl: './bartender-landing-page.component.scss',
})
export class BartenderLandingPageComponent implements OnInit {
    user: User | undefined
    userId: number = 0
    showNotifications = false
    numberNotifications = 0
    notificationLocalId = 0

    constructor(
        private authService: AuthService,
        private notificationService: NotificationService,
        private localuserService: LocalUserService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.authService.user$.subscribe((user) => {
            this.user = user
        })
        this.userId = this.authService.user$.getValue().id

        this.localuserService.getLocalUserByUserId(this.userId).subscribe({
            next: (response) => {
                this.notificationLocalId = response.localId
                this.loadActiveNotifications(this.notificationLocalId)
            },
            error: (error) => console.error('Error getting local user:', error),
        })
    }

    loadActiveNotifications(localId: number) {
        this.notificationService.getAllActiveNotifications(localId).subscribe({
            next: (data) => {
                this.numberNotifications = data.length
                console.log('Notifications:', data)
            },
            error: (error) => {
                console.error('Failed to fetch notifications:', error)
            },
        })
    }

    onLogout(): void {
        this.authService.logout()
    }

    onNotifications(): void {
        this.router.navigate(['/notifications-overview-bartender'])
    }
}
