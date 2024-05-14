import { Component, OnInit, OnDestroy } from '@angular/core'
import { AuthService } from '../../../auth/auth.service'
import { NotificationService } from '../../Xuniversal/notification.service'
import { User } from '../../../auth/model/user.model'
import { LocalUserService } from '../../Xuniversal/local-user.service'
import { ToastrService } from 'ngx-toastr'

@Component({
    selector: 'app-notification-overview',
    templateUrl: './notification-overview.component.html',
    styleUrl: './notification-overview.component.scss',
})
export class NotificationOverviewComponent implements OnInit, OnDestroy {
    user: User | undefined
    userId: number = 0
    notificationLocalId: number = 0
    notifications: any[] = []
    private refreshIntervalId: any

    constructor(
        private authService: AuthService,
        private localuserService: LocalUserService,
        private notificationService: NotificationService,
        private toastr: ToastrService
    ) {}

    ngOnInit() {
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

        this.loadActiveNotifications(this.notificationLocalId)
        this.refreshIntervalId = setInterval(() => {
            this.loadActiveNotifications(this.notificationLocalId)
        }, 15000)
    }

    ngOnDestroy(): void {
        if (this.refreshIntervalId) {
            clearInterval(this.refreshIntervalId)
        }
    }

    loadActiveNotifications(localId: number) {
        this.notificationService.getAllActiveNotifications(localId).subscribe({
            next: (data) => {
                console.log('Notifications:', data)
                if (
                    this.notifications &&
                    data.length > this.notifications.length
                ) {
                    this.toastr.info('You have new notifications')
                }
                this.notifications = data
            },
            error: (error) => {
                console.error('Failed to fetch notifications:', error)
            },
        })
    }

    markAsRead(notificationId: number) {
        this.notificationService
            .deactivateNotification(notificationId)
            .subscribe({
                next: (data) => {
                    console.log('Notification deactivated successfully:', data)
                    this.loadActiveNotifications(this.notificationLocalId)
                },
                error: (error) => {
                    console.error('Failed to deactivate notification:', error)
                },
            })
    }
}
