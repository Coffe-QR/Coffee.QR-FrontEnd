import { Component, OnInit } from '@angular/core'
import { User } from '../../../auth/model/user.model'
import { AuthService } from '../../../auth/auth.service'
import { EventService } from '../event.service'
import { ItemService } from '../item.service'
import { SupplyService } from '../supply.service'
import { Router } from '@angular/router'
import { Supply } from '../../../auth/model/supply.model'
import { Item } from '../../../auth/model/item.model'

@Component({
    selector: 'app-manager-landing-page',
    templateUrl: './manager-landing-page.component.html',
    styleUrl: './manager-landing-page.component.scss',
})
export class ManagerLandingPageComponent implements OnInit {
    user: User | undefined
    events: any[] = []
    userId: number = 0

    constructor(
        private itemService: ItemService,
        private supplyService: SupplyService,
        private router: Router,
        private eventService: EventService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
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
        this.userId = this.authService.user$.getValue().id

        this.eventService.getAllEventsByUserId(this.userId).subscribe({
            next: (data) => {
                this.events = data
            },
            error: (err) => console.error('Failed to load events:', err),
        })
    }

    loadEvents(): void {
        this.eventService.getAllEventsByUserId(this.userId).subscribe({
            next: (data) => {
                this.events = data
            },
            error: (err) => console.error('Failed to load events:', err),
        })
    }

    deleteEvent(eventId: number): void {
        this.eventService.deleteEvent(eventId).subscribe({
            next: () => {
                console.log('Event deleted successfully')
                this.loadEvents() // Reload events to update the list
            },
            error: (err) => this.loadEvents(),
        })
    }
    //===============================================================================
    supplies: Supply[] = []
    suppliesDisplaying: Supply[] = []
    selectedStatus: number = 0

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

    action(supply: Supply): any {
        switch (supply.status) {
            case 0:
                this.supplyService.taken(supply.id, supply).subscribe()
                location.reload()
                break
            case 1:
                this.supplyService.confirm(supply.id, supply).subscribe()
                location.reload()
                break
            case 2:
                this.supplyService.confirm(supply.id, supply).subscribe()
                location.reload()
                break
        }
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

    selectedProduct: any = null
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
    error(item: Supply): void {
        this.openItemModal1(item)
    }

    closeItemModal() {
        const modal = document.getElementById('itemModal')
        if (modal) {
            modal.classList.add('hidden')
        }
        this.selectedProduct = null
        this.items = []
    }

    //================================================================
    items1: Item[] = []
    openItemModal1(product: any) {
        this.itemService.getAllForSupply(product.id).subscribe({
            next: (res) => {
                this.items1 = res
            },
            error: (err) => {
                console.error('Error fetching items:', err)
                this.items1 = []
            },
        })
        this.selectedProduct = product
        const modal = document.getElementById('itemModal1')
        if (modal) {
            modal.classList.remove('hidden')
        }
    }

    // Funkcija za zatvaranje modal-a
    closeItemModal1() {
        const modal = document.getElementById('itemModal1')
        if (modal) {
            modal.classList.add('hidden')
        }
        this.selectedProduct = null
        this.items1 = []
    }
}
