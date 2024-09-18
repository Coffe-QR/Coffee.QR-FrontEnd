import { Component, OnInit, OnDestroy } from '@angular/core'
import { AuthService } from '../../../auth/auth.service'
import { NotificationService } from '../../Xuniversal/notification.service'
import { User } from '../../../auth/model/user.model'
import { LocalUserService } from '../../Xuniversal/local-user.service'
import { ToastrService } from 'ngx-toastr'
import { OrderService } from '../../Xuniversal/order.service'
import { Router } from '@angular/router'
import { TableService } from '../../Xuniversal/table.service'
import { ReceiptService } from '../receipt.service'

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
    orders: any[] = []
    tables: any[] = []

    searchTerm: string = ''

    constructor(
        private authService: AuthService,
        private localuserService: LocalUserService,
        private notificationService: NotificationService,
        private orderService: OrderService,
        private toastr: ToastrService,
        private tableService: TableService,
        private receiptService: ReceiptService,
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
                this.loadActiveNotifications(this.notificationLocalId)
                this.loadOrdersByLocalIdAndIsActive(this.notificationLocalId)
                this.tableService
                    .getAllTablesForLocal(this.notificationLocalId)
                    .subscribe({
                        next: (data) => {
                            console.log('Tables:', data)
                            this.tables = data
                        },
                        error: (error) => {
                            console.error('Failed to fetch tables:', error)
                        },
                    })
            },
            error: (error) => console.error('Error getting local user:', error),
        })

        this.loadActiveNotifications(this.notificationLocalId)
        this.refreshIntervalId = setInterval(() => {
            this.loadActiveNotifications(this.notificationLocalId)
        }, 15000)

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

    loadOrdersByLocalIdAndIsActive(localId: number) {
        this.orderService.getOrdersByLocalIdAndIsActive(localId).subscribe({
            next: (data) => {
                // Sort orders by `isTaken`, showing `false` first and `true` later
                this.orders = data.sort((a: any, b: any) => {
                    return a.isTaken === b.isTaken ? 0 : a.isTaken ? 1 : -1
                })

                this.orders.forEach((order) => {
                    this.tableService
                        .getTableById(order.tableId)
                        .subscribe((table) => {
                            order.tableName = table.name // Append table name to each order
                        })
                    console.log('Orders:', this.orders)
                })

                if (this.orders && data.length > this.orders.length) {
                    this.toastr.info('You have new orders')
                }
            },
            error: (error) => {
                console.error('Failed to fetch orders:', error)
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

    seeOrder(orderId: number) {
        this.router.navigate(['/order-details/', orderId])
    }

    completeAllOrders(tableId: number) {
        this.orderService.deactivateAllForTableOrders(tableId).subscribe({
            next: (data) => {
                this.toastr.success(
                    'All orders for the table have been completed.'
                )
                this.loadOrdersByLocalIdAndIsActive(this.notificationLocalId)
            },
            error: (error) => {
                console.error('Failed to complete orders:', error)
            },
        })
    }

    printReceipts(tableId: number) {
        this.tableService.getTotalPriceForTable(tableId).subscribe({
            next: (data) => {
                const total = data

                let moneyReceived = prompt(
                    `Total is ${total}. Please enter the amount received:`
                )

                if (moneyReceived !== null && moneyReceived.trim() !== '') {
                    const receivedAmount = parseFloat(moneyReceived)

                    if (!isNaN(receivedAmount)) {
                        if (receivedAmount < total) {
                            alert(
                                `Received amount is less than the total. Please enter an amount equal to or greater than the total.`
                            )
                            return
                        }

                        this.receiptService
                            .createReceiptForWholeTable(
                                receivedAmount,
                                tableId,
                                this.userId
                            )
                            .subscribe({
                                next: (response) => {
                                    console.log(
                                        'Receipt created successfully',
                                        response
                                    )
                                },
                                error: (error) => {
                                    console.error(
                                        'Error creating receipt',
                                        error
                                    )
                                },
                            })
                    } else {
                        alert(
                            'Invalid number entered. Please enter a valid number.'
                        )
                    }
                } else {
                    alert('No amount entered. Receipt creation cancelled.')
                }
            },
            error: (error) => {
                console.error('Failed to calculate total price:', error)
            },
        })
    }

    calculateTotal(tableId: number) {
        this.tableService.getTotalPriceForTable(tableId).subscribe({
            next: (data) => {
                console.log('Total price:', data)
                this.toastr.info(`Total price for table ${tableId}: ${data} $`)
            },
            error: (error) => {
                console.error('Failed to calculate total price:', error)
            },
        })
    }
}
