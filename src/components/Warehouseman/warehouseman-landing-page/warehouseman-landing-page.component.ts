import { Component, OnInit } from '@angular/core'
import { User } from '../../../auth/model/user.model'
import { AuthService } from '../../../auth/auth.service'
import { Supply } from '../../../auth/model/supply.model'
import { SupplyService } from '../../CofeeManager/supply.service'
import { Router } from '@angular/router'
import { Item } from '../../../auth/model/item.model'
import { ItemService } from './../../CofeeManager/item.service'

@Component({
    selector: 'app-warehouseman-landing-page',
    templateUrl: './warehouseman-landing-page.component.html',
    styleUrl: './warehouseman-landing-page.component.scss',
})
export class WarehousemanLandingPageComponent implements OnInit {
    user: User | undefined

    supplies: Supply[] = []
    suppliesDisplaying: Supply[] = []
    selectedStatus: number = 0

    constructor(
        private itemService: ItemService,
        private supplyService: SupplyService,
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.authService.user$.subscribe((user) => {
            this.user = user
            this.supplyService.getAllSupplies().subscribe({
                next: (response) => {
                    this.supplies = response
                    this.suppliesDisplaying = response
                    this.filterCategory(this.selectedStatus)
                },
                error: (error) => console.error('Error creating event:', error),
            })
        })
    }

    getStatusText(status: number): string {
        switch (status) {
            case 0:
                return 'Ordered'
            case 1:
                return 'Taken'
            case 2:
                return 'Mistake'
            case 3:
                return 'Confirmed'
            default:
                return 'Default'
        }
    }

    details(item: Supply): void {
        this.router.navigate(['supply-details/', item.id])
    }

    onLogout(): void {
        this.authService.logout()
    }

    filterCategory(category: number) {
        this.selectedStatus = category
        this.suppliesDisplaying = this.supplies.filter(
            (product) => product.status == category
        )
    }

    getSelectedStatus(): number {
        return this.selectedStatus
    }

    getButtonName(item: Supply): string {
        switch (item.status) {
            case 0:
                return 'Taken'
            case 1:
                return 'Confirmed'
            case 2:
                return 'Confirmed'
            case 3:
                return 'Confirmed'
            default:
                return 'Default'
        }
    }

    selectedProduct: any = null // Trenutno izabrani proizvod za prikaz detalja
    items: Item[] = []
    openItemModal(product: any) {
        this.itemService.getAllForSupply(product.id).subscribe({
            next: (res) => {
                this.items = res
                console.log(res)
            },
            error: (err) => {
                console.error('Error fetching items:', err)
                this.items = []
            },
        })
        this.selectedProduct = product
        const modal = document.getElementById('itemModal')
        if (modal) {
            modal.classList.remove('hidden')
        }
    }

    // Funkcija za zatvaranje modal-a
    closeItemModal() {
        const modal = document.getElementById('itemModal')
        if (modal) {
            modal.classList.add('hidden')
        }
        this.selectedProduct = null
        this.items = []
    }
}
