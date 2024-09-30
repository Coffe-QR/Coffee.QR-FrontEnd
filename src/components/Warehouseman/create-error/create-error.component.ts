import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Item } from '../../../auth/model/item.model'
import { Supply } from '../../../auth/model/supply.model'
import { SupplyItem } from '../../../auth/model/supply-item.model'
import { Observable } from 'rxjs'
import { Sale } from '../../../auth/model/sale.model'
import { ItemService } from '../../CofeeManager/item.service'
import { SupplyService } from '../../CofeeManager/supply.service'
import { SupplyItemService } from '../../CofeeManager/supply-item.service'
import { SaleService } from '../../CofeeManager/sale.service'
import { ErrorItemService } from '../../CofeeManager/errorItem.service'
import { ErrorSupplyDto } from '../../../auth/model/error-supply.model'

@Component({
    selector: 'app-create-error',
    templateUrl: './create-error.component.html',
    styleUrl: './create-error.component.scss',
})
export class CreateErrorComponent {
    products: Item[] = []
    filteredProducts: Item[] = []
    orderItems: any[] = []
    searchTerm: string = ''
    supply: Supply | null = null

    constructor(
        private errorService: ErrorItemService,
        private itemService: ItemService,
        private supplyService: SupplyService,
        private supplyItemService: SupplyItemService,
        private saleService: SaleService,
        private router: Router
    ) {}

    performSearch() {
        if (this.searchTerm === '') this.filteredProducts = this.products
        this.filteredProducts = this.filteredProducts.filter(
            (o) =>
                o.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                o.companyName
                    .toLowerCase()
                    .includes(this.searchTerm.toLowerCase()) ||
                o.daysDelivery
                    .toString()
                    .toLowerCase()
                    .includes(this.searchTerm.toLowerCase())
        )
    }

    supplyIdEvoGa: number = -1

    ngOnInit() {
        this.itemService.getAllForBuy().subscribe({
            next: (response) => {
                this.products = response
                this.filteredProducts = response
            },
            error: (error) => console.error('Error creating event:', error),
        })
        const supplyId = localStorage.getItem('evoGa')
        this.supplyIdEvoGa = Number(supplyId)
        if (supplyId !== null) {
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
                    localStorage.removeItem('evoGa')
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
            companyName: '',
            ordered: null,
        }
        let supplyItems: ErrorSupplyDto[] = []
        this.orderItems.forEach((oi) => {
            supplyItems.push({
                id: -1,
                itemId: oi.product.id,
                receivedQuantity: oi.quantity,
                price: oi.product.price * oi.quantity,
                supplyId: this.supplyIdEvoGa,
                status: 'MISSING',
                expectedQuantity: -1,
            })
        })

        this.errorService.createSupplyItems(supplyItems).subscribe({
            next: (response) => {
                alert('You have successfully completed the purchase.')
                this.orderItems = []
                this.router.navigate(['/warehouseman'])
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
        // Recalculate total if necessary
    }

    selectedProduct: any = null
    sales: Sale[] = []

    openModal(product: any) {
        this.saleService.getAllCostForLocal(product.companyName).subscribe({
            next: (res) => {
                this.sales = res
            },
        })
        this.selectedProduct = product
        const modal = document.getElementById('detailsModal')
        if (modal) {
            modal.classList.remove('hidden')
        }
    }

    closeModal() {
        const modal = document.getElementById('detailsModal')
        if (modal) {
            modal.classList.add('hidden')
        }
        this.selectedProduct = null
    }

    getDiscount(quantity: any, sales: any): any {
        if (!sales || !Array.isArray(sales)) return 1 // Check if sales is undefined or not an array
        for (let i = 1; i < sales.length; i++) {
            if (sales[i].pieces > quantity && quantity > sales[i - 1].pieces) {
                return 1 - sales[i - 1].discount / 100
            }
        }
        return 1 // Default value if no applicable discount
    }

    getPrice(item: any): any {
        let discount = this.getDiscount(item.quantity, item.product.sales)
        return (item.product.price * item.quantity * discount).toFixed(2)
    }
}
