import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { MenuItemService } from '../../Xuniversal/menu-item.service'
import { RegionItemService } from '../region-item-service'
@Component({
    selector: 'app-region-items',
    templateUrl: './region-items.component.html',
    styleUrl: './region-items.component.scss',
})
export class RegionItemsComponent {
    regionId: number = 0
    Drinks: any[] = []
    Foods: any[] = []
    ItemsInRegion: any[] = []
    ItemsNotInRegion: any[] = []
    searchTerm: string = ''
    searchTerm1: string = ''

    constructor(
        private menuItemService: MenuItemService,
        private regionItemService: RegionItemService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.regionId = this.route.snapshot.params['regionId']

        this.regionItemService.getAllForRegion(this.regionId).subscribe({
            next: (data) => {
                console.log('DAAA ', data)
                this.ItemsInRegion = data
            },
            error: (err) => console.error('Failed to load items:', err),
        })

        this.regionItemService.getAllNotOnRegion(this.regionId).subscribe({
            next: (data) => {
                this.ItemsNotInRegion = data
            },
            error: (err) => console.error('Failed to load items:', err),
        })
    }

    deleteItemFromMenu(itemId: number): void {}

    removeFromRegion(itemId: number): void {
        this.regionItemService
            .deleteByRegionIdAndItemId(this.regionId, itemId)
            .subscribe({
                next: () => {
                    console.log('Item deleted successfully')
                    this.ngOnInit()
                },
                error: (err) => this.ngOnInit(),
            })
    }

    addItemToMenu(itemId: number): void {
        const itemData = {
            regionId: this.regionId,
            itemId: itemId,
        }

        this.regionItemService.create(itemData).subscribe({
            next: () => {
                console.log('Item added successfully')
                this.ngOnInit()
            },
            error: (err) => this.ngOnInit(),
        })
    }
}
