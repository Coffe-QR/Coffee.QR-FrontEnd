import { Component } from '@angular/core'
import { Item } from '../../../auth/model/item.model'
import { FormBuilder, FormGroup } from '@angular/forms'
import { ItemService } from '../../CofeeManager/item.service'

@Component({
    selector: 'app-warehouse',
    templateUrl: './warehouse.component.html',
    styleUrl: './warehouse.component.scss',
})
export class WarehouseComponent {
    items: Item[] = [] // Pretpostavimo da će ovo biti popunjeno sa pravim podacima
    filteredItems: Item[] = []
    filterForm: FormGroup

    constructor(
        private fb: FormBuilder,
        private itemService: ItemService
    ) {
        this.filterForm = this.fb.group({
            search: [''],
            type: ['all'],
        })
    }

    ngOnInit(): void {
        // Ovde biste obično učitali podatke iz servisa
        this.itemService.getAllItems().subscribe({
            next: (response) => {
                this.items = response
                this.filteredItems = response
            },
            error: (error) => console.error('Error creating event:', error),
        })

        this.filteredItems = this.items
        this.filterForm.valueChanges.subscribe(() => this.filterItems())
    }

    filterItems(): void {
        const searchTerm = this.filterForm.get('search')?.value.toLowerCase()
        const typeFilter = this.filterForm.get('type')?.value

        this.filteredItems = this.items.filter((item) => {
            const matchesSearch =
                item.name.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm)
            const matchesType =
                typeFilter === 'all' || item.type.toString() === typeFilter
            return matchesSearch && matchesType
        })
    }

    getTypeLabel(type: number): string {
        switch (type) {
            case 0:
                return 'Hrana'
            case 1:
                return 'Piće'
            case 2:
                return 'Sastojak'
            default:
                return 'Nepoznato'
        }
    }
}
