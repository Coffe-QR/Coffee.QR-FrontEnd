import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { MenuItemService } from '../../Xuniversal/menu-item.service'

@Component({
    selector: 'app-menu-details',
    templateUrl: './menu-details.component.html',
    styleUrls: ['./menu-details.component.scss'],
})
export class MenuDetailsComponent implements OnInit {
    menuId: number = 0
    Drinks: any[] = []
    Foods: any[] = []
    ItemsNotInMenu: any[] = []

    constructor(
        private menuItemService: MenuItemService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.menuId = this.route.snapshot.params['menuId']

        this.menuItemService.getAllDrinksForMenu(this.menuId).subscribe({
            next: (data) => {
                this.Drinks = data
            },
            error: (err) => console.error('Failed to load drinks:', err),
        })

        this.menuItemService.getAllFoodForMenu(this.menuId).subscribe({
            next: (data) => {
                this.Foods = data
            },
            error: (err) => console.error('Failed to load food:', err),
        })

        this.menuItemService.getAllNotOnMenu(this.menuId).subscribe({
            next: (data) => {
                this.ItemsNotInMenu = data
            },
            error: (err) => console.error('Failed to load items:', err),
        })
    }

    deleteItemFromMenu(itemId: number): void {
        this.menuItemService
            .deleteByMenuIdAndItemId(this.menuId, itemId)
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
            menuId: this.menuId,
            itemId: itemId,
        }

        this.menuItemService.createMenuItem(itemData).subscribe({
            next: () => {
                console.log('Item added successfully')
                this.ngOnInit()
            },
            error: (err) => this.ngOnInit(),
        })
    }
}
