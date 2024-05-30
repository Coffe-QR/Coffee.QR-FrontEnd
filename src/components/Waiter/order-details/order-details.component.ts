import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { OrderService } from '../../Xuniversal/order.service'
import { OrderItemService } from '../../Xuniversal/order-item.service'
import { ReceiptService } from '../receipt.service'
import { AuthService } from '../../../auth/auth.service'
import { User } from '../../../auth/model/user.model'

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
    orderId: number = 0
    orderItems: any[] = []
    order: any = {}
    user: User | undefined
    userId: number = 0

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private orderService: OrderService,
        private orderItemService: OrderItemService,
        private receiptService: ReceiptService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.authService.user$.subscribe((user) => {
            this.user = user
        })
        this.userId = this.authService.user$.getValue().id

        const orderIdParam = this.route.snapshot.paramMap.get('orderId')
        this.orderId = orderIdParam ? +orderIdParam : 0

        this.orderService.getOrderById(this.orderId).subscribe({
            next: (data) => {
                this.order = data
                console.log(this.order)
            },
            error: (error) => {
                console.error(error)
            },
        })

        this.orderItemService.getAllForOrder(this.orderId).subscribe({
            next: (data) => {
                this.orderItems = data
                this.orderItems.forEach((orderItem) => {
                    this.orderItemService
                        .getQuantityByOrderIdAndItemId(
                            this.orderId,
                            orderItem.id
                        )
                        .subscribe({
                            next: (quantity) => {
                                orderItem.quantity = quantity
                            },
                            error: (error) => {
                                console.error(error)
                            },
                        })
                })
            },
            error: (error) => {
                console.error(error)
            },
        })
    }

    markAsDone(orderId: number) {
        this.orderService.deactivateOrder(orderId).subscribe({
            next: (data) => {
                this.router.navigate(['/notifications-overview'])
            },
            error: (error) => {
                console.error(error)
            },
        })
    }

    printReceipt(orderId: number) {
        const moneyReceived = prompt('Please enter the amount received:')
        if (moneyReceived !== null && moneyReceived.trim() !== '') {
            const money = parseFloat(moneyReceived)
            if (!isNaN(money)) {
                // Assuming you have some way to create receipt data
                const receiptData = {
                    path: '',
                    date: new Date().toISOString().split('T')[0],
                    orderId: orderId,
                    waiterId: this.userId,
                }
                this.receiptService
                    .createReceipt(money, receiptData)
                    .subscribe({
                        next: (response) => {
                            console.log(
                                'Receipt created successfully',
                                response
                            )
                            // Optionally perform further actions, like displaying a success message
                        },
                        error: (error) => {
                            console.error('Error creating receipt', error)
                            // Optionally handle the error, e.g., show an error message to the user
                        },
                    })
            } else {
                alert('Invalid number entered. Please enter a valid number.')
            }
        } else {
            alert('No amount entered. Receipt creation cancelled.')
        }
    }
}
