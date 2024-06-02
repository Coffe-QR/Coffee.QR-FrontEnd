import { Component } from '@angular/core'
import { Item } from '../../../auth/model/item.model'
import { Supply } from '../../../auth/model/supply.model'
import { ItemService } from '../item.service'
import { SupplyService } from '../supply.service'
import { Router } from '@angular/router'
import { SupplyItem } from '../../../auth/model/supply-item.model'
import { ContractItemService } from '../contract-item.service'
import { ContractService } from '../contract.service'
import { OrderItem } from '../../../auth/model/order-item.model'
import { ContractItem } from '../../../auth/model/contract-item.model'

@Component({
    selector: 'app-contract-item',
    templateUrl: './contract-item.component.html',
    styleUrl: './contract-item.component.scss',
})
export class ContractItemComponent {
    products: Item[] = []
    filteredProducts: Item[] = []
    orderItems: any[] = []
    searchTerm: string = ''
    supply: Supply | null = null
    contractId: number | null = null

    constructor(
        private itemService: ItemService,
        private contractService: ContractService,
        private contractItemService: ContractItemService,
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
                this.products = response
                this.filteredProducts = response
            },
            error: (error) => console.error('Error creating event:', error),
        })
        this.contractId = Number(localStorage.getItem('contract-id'))
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
        if (this.orderItems.length === 0 || this.contractId === null) return
        // Implement checkout logic
        let supply: Supply = {
            id: 0,
            companyId: 0,
            totalPrice: this.total,
            status: 2,
        }
        let contractItems: ContractItem[] = []
        this.orderItems.forEach((oi) => {
            contractItems.push({
                id: -1,
                contractId: this.contractId !== null ? this.contractId : -1,
                itemId: oi.product.id,
                quantity: oi.quantity,
                price: oi.product.price * oi.quantity,
            })
        })
        this.contractItemService.createContractItems(contractItems).subscribe({
            next: (response) => {
                alert('You have successfully created contract.')
                localStorage.removeItem('contract-id')
                this.router.navigate(['/manager'])
            },
            error: (error) =>
                console.error('Error creating supply items:', error),
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
            this.orderItems = this.orderItems.filter(
                (o) => o.product.id !== item.product.id
            )
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
