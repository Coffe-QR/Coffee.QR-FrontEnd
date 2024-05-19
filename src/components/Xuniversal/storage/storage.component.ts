import { Component } from '@angular/core'
import { ItemService } from '../../CofeeManager/item.service'
import { Item } from '../../../auth/model/item.model'

@Component({
    selector: 'app-storage',
    templateUrl: './storage.component.html',
    styleUrl: './storage.component.scss',
})
export class StorageComponent {
    searchTerm: string = ''
    filteredProducts: Item[] = []
    products: Item[] = []

    constructor(private itemService: ItemService) {}

    ngOnInit() {
        this.itemService.getAllItemForStorage(1).subscribe({
            next: (response) => {
                if (response) {
                    this.filteredProducts = response
                    this.products = response
                }
            },
            error: (error) => console.error(error),
        })
    }
    performSearch() {
        this.filteredProducts = this.filteredProducts.filter((o) =>
            o.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
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
}
