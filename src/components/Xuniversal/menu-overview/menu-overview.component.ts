import { Component, OnInit } from '@angular/core'
import { NotificationService } from '../notification.service'
import { ActivatedRoute } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { TableService } from '../table.service'
import { MenuItemService } from '../menu-item.service'
import { MenuService } from '../menu.service'
import { OrderService } from '../order.service'
import { OrderItemService } from '../order-item.service'

@Component({
    selector: 'app-menu-overview',
    templateUrl: './menu-overview.component.html',
    styleUrl: './menu-overview.component.scss',
})
export class MenuOverviewComponent implements OnInit {
    localId: number = 0
    tableId: number = 0
    menuId: number = 0
    tableName: string = ''
    Drinks: any[] = []
    Foods: any[] = []

    addedQuantity: number = 0

    // Properties
    orderPrice: number = 100
    orderDescription: string = ''
    orderDate: string = ''
    orderIsActive: boolean = true

    constructor(
        private notificationService: NotificationService,
        private tableService: TableService,
        private menuItemService: MenuItemService,
        private orderService: OrderService,
        private orderItemService: OrderItemService,
        private route: ActivatedRoute,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        const localIdParam = this.route.snapshot.paramMap.get('localId')
        const tableIdParam = this.route.snapshot.paramMap.get('tableId')
        const menuIdParam = this.route.snapshot.paramMap.get('menuId')

        this.localId = localIdParam ? +localIdParam : 0
        this.tableId = tableIdParam ? +tableIdParam : 0
        this.menuId = menuIdParam ? +menuIdParam : 0

        this.tableService.getTableById(this.tableId).subscribe({
            next: (data) => {
                this.tableName = data.name
            },
        })

        this.menuItemService.getAllDrinksForMenu(this.menuId).subscribe({
            next: (data) => {
                this.Drinks = data
            },
            error: (err) => console.error('Failed to load drinks:', err),
        })

        this.menuItemService.getAllFoodForMenu(this.menuId).subscribe({
            next: (data) => {
                this.Foods = data
            },
            error: (err) => console.error('Failed to load food:', err),
        })
    }

    callWaiter() {
        const notificationData = {
            message: this.tableName + ' asked to come',
            dateTime: new Date().toISOString(),
            isActive: true,
            tableId: this.tableId,
            localId: this.localId,
        }

        this.notificationService
            .createNotification(notificationData)
            .subscribe({
                next: (data) =>
                    this.toastr.success('Waiter called successfully!'),
                error: (error) => console.error('GREDA:', error),
            })
    }

    askForTheBill() {
        const notificationData = {
            message: this.tableName + ' asked for a bill',
            dateTime: new Date().toISOString(),
            isActive: true,
            tableId: this.tableId,
            localId: this.localId,
        }

        this.notificationService
            .createNotification(notificationData)
            .subscribe({
                next: (data) =>
                    this.toastr.success('Bill requsted successfully!'),
                error: (error) => console.error('GREDA:', error),
            })
    }

    order(): void {
        this.orderDate = new Date().toISOString().split('T')[0]

        const orderData = {
            price: this.orderPrice,
            description: this.orderDescription,
            tableId: this.tableId,
            localId: this.localId,
            date: this.orderDate,
            isActive: this.orderIsActive,
        }

        console.log('Order data:', orderData)

        this.orderService.createOrder(orderData).subscribe({
            next: (data) => {
                this.toastr.success('Order created successfully!')
            },
            error: (error) => console.error('GREDA:', error),
        })
    }

    addedItems: number[] = []

    addItemToOrder(itemId: number): void {
        this.addedItems.push(itemId)
        this.addedQuantity++
        console.log('Added items:', this.addedItems)
    }

    removeItemFromOrder(itemId: number): void {
        this.addedItems = this.addedItems.filter((id) => id !== itemId)
        this.addedQuantity--
        console.log('Added items after remove:', this.addedItems)
    }
}
