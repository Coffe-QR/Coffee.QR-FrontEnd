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

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private orderService: OrderService,
        private orderItemService: OrderItemService
    ) {}

    ngOnInit(): void {
        const orderIdParam = this.route.snapshot.paramMap.get('orderId')
        this.orderId = orderIdParam ? +orderIdParam : 0

        this.orderItemService.getAllForOrder(this.orderId).subscribe({
            next: (data) => {
                this.orderItems = data
                console.log(this.orderItems)
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
}
