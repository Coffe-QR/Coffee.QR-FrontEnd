import { Component, OnInit, OnDestroy } from '@angular/core'
import { AuthService } from '../../../auth/auth.service'
import { NotificationService } from '../../Xuniversal/notification.service'
import { User } from '../../../auth/model/user.model'
import { LocalUserService } from '../../Xuniversal/local-user.service'
import { ToastrService } from 'ngx-toastr'
import { OrderService } from '../../Xuniversal/order.service'
import { Router } from '@angular/router'

@Component({
    selector: 'app-notification-overview-bartender',
    templateUrl: './notification-overview-bartender.component.html',
    styleUrl: './notification-overview-bartender.component.scss',
})
export class NotificationOverviewBartenderComponent {
    user: User | undefined
    userId: number = 0
    notificationLocalId: number = 0
    notifications: any[] = []
    private refreshIntervalId: any
    orders: any[] = []

    constructor(
        private authService: AuthService,
        private localuserService: LocalUserService,
        private orderService: OrderService,
        private toastr: ToastrService,
        private router: Router
    ) {}

    ngOnInit() {
        this.authService.user$.subscribe((user) => {
            this.user = user
        })
        this.userId = this.authService.user$.getValue().id

        this.localuserService.getLocalUserByUserId(this.userId).subscribe({
            next: (response) => {
                this.notificationLocalId = response.localId

                this.loadOrdersByLocalIdAndIsActive(this.notificationLocalId)
            },
            error: (error) => console.error('Error getting local user:', error),
        })

        this.loadOrdersByLocalIdAndIsActive(this.notificationLocalId)
        this.refreshIntervalId = setInterval(() => {
            this.loadOrdersByLocalIdAndIsActive(this.notificationLocalId)
        }, 15000)
    }

    ngOnDestroy(): void {
        if (this.refreshIntervalId) {
            clearInterval(this.refreshIntervalId)
        }
    }

    loadOrdersByLocalIdAndIsActive(localId: number) {
        this.orderService.getOrdersByLocalIdAndIsActive(localId).subscribe({
            next: (data) => {
                console.log('Orders:', data)
                if (this.orders && data.length > this.orders.length) {
                    this.toastr.info('You have new orders')
                }
                this.orders = data
            },
            error: (error) => {
                console.error('Failed to fetch orders:', error)
            },
        })
    }

    seeOrder(orderId: number) {
        this.router.navigate(['/order-details/', orderId])
    }
}
