import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { ItemService } from '../item.service'
import { Item } from '../../../auth/model/item-model'
import { Supply } from '../../../auth/model/supply.model'
import { SupplyService } from '../supply.service'
import { SupplyItemService } from '../supply-item.service'
import { SupplyItem } from '../../../auth/model/supply-item.model'

@Component({
    selector: 'app-supply-create',
    templateUrl: './supply-create.component.html',
    styleUrl: './supply-create.component.scss',
})
export class SupplyCreateComponent {
    products: Item[] = []
    filteredProducts: Item[] = []
    orderItems: any[] = []
    searchTerm: string = ''
    supply: Supply | null = null

    constructor(
        private itemService: ItemService,
        private supplyService: SupplyService,
        private supplyItemService: SupplyItemService,
        private router: Router
    ) {}

    performSearch() {
        this.filteredProducts = this.filteredProducts.filter((o) =>
            o.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
    }

    ngOnInit() {
        this.itemService.getAllItems().subscribe({
            next: (response) => {
                //console.log(response)
                this.products = response
                this.filteredProducts = response
            },
            error: (error) => console.error('Error creating event:', error),
        })
        const supplyId = localStorage.getItem('supply')
        if (supplyId !== null) {
            //
            this.supplyItemService.getAllForSupply(Number(supplyId)).subscribe({
                next: (response) => {
                    response.forEach((element: any) => {
                        this.orderItems.push({
                            product: this.products.find(
                                (p) => p.id === element.itemId
                            ),
                            quantity: element.quantity,
                        })
                    })

                    localStorage.removeItem('supply')
                    console.log(this.orderItems)
                },
                error: (error) => console.error('Error creating event:', error),
            })
        }
    }

    filterCategory(category: number) {
        if (category === 3) {
            this.filteredProducts = [...this.products]
        } else {
            this.filteredProducts = this.products.filter(
                (product) => product.type == category
            )
        }
    }

    addToOrder(product: any) {
        const existingItem = this.orderItems.find(
            (item) => item.product.id === product.id
        )
        if (existingItem) {
            existingItem.quantity++
        } else {
            this.orderItems.push({ product, quantity: 1 })
        }
    }

    get total() {
        return this.orderItems.reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
        )
    }

    checkout() {
        if (this.orderItems.length === 0) return
        // Implement checkout logic
        let supply: Supply = {
            id: 0,
            companyId: 0,
            totalPrice: this.total,
            status: 2,
        }
        this.supplyService.createSupply(supply).subscribe({
            next: (response) => {
                supply = response
                let supplyItems: SupplyItem[] = []
                this.orderItems.forEach((oi) => {
                    supplyItems.push({
                        id: -1,
                        supplyId: supply.id,
                        itemId: oi.product.id,
                        quantity: oi.quantity,
                        price: oi.product.price * oi.quantity,
                    })
                })
                this.supplyItemService
                    .createSupplyItems(supplyItems)
                    .subscribe({
                        next: (response) =>
                            alert(
                                'You have successfully completed the purchase.'
                            ),
                        error: (error) =>
                            console.error(
                                'Error creating supply items:',
                                error
                            ),
                    })
            },
            error: (error) => console.error('Error creating supply:', error),
        })
    }
    increaseQuantity(item: any) {
        item.quantity++
        this.updateTotal()
    }

    decreaseQuantity(item: any) {
        if (item.quantity > 1) {
            item.quantity--
        } else {
            this.orderItems = this.orderItems.filter((o) => o.id !== item.id)
        }
        this.updateTotal()
    }

    updateTotal() {
        // this.total = 0
        this.orderItems.forEach((item) => {
            //    this.total += item.product.price * item.quantity
        })
    }
}
