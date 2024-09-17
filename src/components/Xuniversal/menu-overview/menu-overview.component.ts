import { Component, OnInit } from '@angular/core'
import { NotificationService } from '../notification.service'
import { ActivatedRoute } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { TableService } from '../table.service'
import { MenuItemService } from '../menu-item.service'
import { MenuService } from '../menu.service'
import { OrderService } from '../order.service'
import { OrderItemService } from '../order-item.service'
import { RegionService } from '../../CofeeManager/region-service'
import { RegionItemService } from '../../CofeeManager/region-item-service'
import { trigger, state, style, transition, animate } from '@angular/animations'

@Component({
    selector: 'app-menu-overview',
    templateUrl: './menu-overview.component.html',
    styleUrl: './menu-overview.component.scss',
    animations: [
        trigger('fadeInOut', [
            state(
                'void',
                style({
                    opacity: 0,
                    height: 0, // consider adjusting height and opacity handling
                    overflow: 'hidden',
                })
            ),
            state(
                '*',
                style({
                    opacity: 1,
                    height: '*',
                })
            ),
            transition(':enter', [animate('200ms ease-out')]), // Reduced time and smoother easing
            transition(':leave', [animate('200ms ease-in')]),
        ]),
    ],
})
export class MenuOverviewComponent implements OnInit {
    localId: number = 0
    tableId: number = 0
    menuId: number = 0
    tableName: string = ''

    Items: any[] = []
    selectedItems: any[] = []
    filteredItems: any[] = []

    regions: any[] = []

    addedQuantity: number = 0

    searchTerm: string = ''
    showRegions: boolean = false

    // Properties
    orderPrice: number = 0
    orderDescription: string = ''
    orderDate: string = ''
    orderIsActive: boolean = true

    constructor(
        private notificationService: NotificationService,
        private tableService: TableService,
        private menuItemService: MenuItemService,
        private orderService: OrderService,
        private orderItemService: OrderItemService,
        private regionService: RegionService,
        private regionItemService: RegionItemService,
        private menuService: MenuService,
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

        this.regionService.getAllRegionsByMenuId(this.menuId).subscribe({
            next: (data) => {
                console.log('Regions:', data)
                this.regions = data
            },
            error: (err) => console.error('Failed to load regions:', err),
        })

        this.menuService.getMenuItems(this.menuId).subscribe({
            next: (data) => {
                console.log('Menu items:', data)
                this.Items = data
                this.filteredItems = data
            },
            error: (err) => console.error('Failed to load menu items:', err),
        })
    }

    incrementQuantity(item: any): void {
        item.quantity++
        this.selectedItems.push(item)
    }

    decrementQuantity(item: any): void {
        if (item.quantity > 0) {
            item.quantity--
        }
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
        const distinctItems = this.selectedItems.filter(
            (item, index, self) => self.indexOf(item) === index
        )

        this.orderPrice = distinctItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        )

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

                distinctItems.forEach((item) => {
                    const orderItemData = {
                        quantity: item.quantity,
                        orderId: data.id,
                        itemId: item.id,
                    }
                    console.log('Item:', orderItemData)
                    this.orderItemService
                        .createOrderItem(orderItemData)
                        .subscribe({
                            next: (data) => {},
                            error: (error) => console.error('GREDA:', error),
                        })
                })
            },
            error: (error) => console.error('GREDA:', error),
        })
    }

    showItemsFromRegion(region: any): void {
        this.filteredItems = this.Items.filter(
            (item) => item.regionId === region.id
        )
    }

    showAllItems(): void {
        this.filteredItems = this.Items
    }
}
