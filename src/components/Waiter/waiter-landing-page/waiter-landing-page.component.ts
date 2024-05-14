import { Component, OnInit } from '@angular/core'
import { User } from '../../../auth/model/user.model'
import { AuthService } from '../../../auth/auth.service'
import { NotificationService } from '../../Xuniversal/notification.service'
import { Router } from '@angular/router'
import { LocalUserService } from '../../Xuniversal/local-user.service'
@Component({
    selector: 'app-waiter-landing-page',
    templateUrl: './waiter-landing-page.component.html',
    styleUrl: './waiter-landing-page.component.scss',
})
export class WaiterLandingPageComponent implements OnInit {
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
        this.router.navigate(['/notifications-overview'])
    }
}
