import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { OrderService } from '../../Xuniversal/order.service'
import { OrderItemService } from '../../Xuniversal/order-item.service'

@Component({
    selector: 'app-order-details',
    templateUrl: './order-details.component.html',
    styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
    orderId: number = 0
    orderItems: any[] = []
    order: any = {}

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private orderService: OrderService,
        private orderItemService: OrderItemService
    ) {}

    ngOnInit(): void {
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
        
    }
}
