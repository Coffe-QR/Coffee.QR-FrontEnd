import { Component } from '@angular/core'
import { ItemService } from '../item.service'
import { Item } from '../../../auth/model/item.model'

@Component({
    selector: 'app-worehouse-manager',
    templateUrl: './worehouse-manager.component.html',
    styleUrl: './worehouse-manager.component.scss',
})
export class WorehouseManagerComponent {
    constructor(private itemService: ItemService) {}
    items: Item[] = [] // Ovde bi trebali dodati stvarne stavke
    filteredItems: Item[] = []
    searchQuery: string = ''
    selectedType: number | null = null

    ngOnInit(): void {
        // Ovde biste obično učitali podatke iz servisa
        this.itemService.getAllItemForStorage(1).subscribe({
            next: (response) => {
                this.items = response
                this.filteredItems = response
            },
            error: (error) => console.error('Error creating event:', error),
        })
    }

    filterItems() {
        this.filteredItems = this.items.filter((item) => {
            const matchesSearch = item.name
                .toLowerCase()
                .includes(this.searchQuery.toLowerCase())
            const matchesType =
                this.selectedType === null || item.type === this.selectedType
            return matchesSearch && matchesType
        })
    }

    onSearchChange(event: Event) {
        const input = event.target as HTMLInputElement // Tipiziraj kao HTMLInputElement
        this.searchQuery = input.value // Sada možeš pristupiti value
        this.filterItems()
    }

    onTypeChange(type: number) {
        this.selectedType = type
        this.filterItems()
    }

    orderedItems: Item[] = []

    recomend(itemId: any) {
        this.itemService.reccomend(itemId).subscribe()
        location.reload()
    }
}
