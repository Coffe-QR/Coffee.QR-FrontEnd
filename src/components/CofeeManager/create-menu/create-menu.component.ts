import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { MenuService } from '../../Xuniversal/menu.service'
import { AuthService } from '../../../auth/auth.service'
import { LocalUserService } from '../../Xuniversal/local-user.service'

@Component({
    selector: 'app-create-menu',
    templateUrl: './create-menu.component.html',
    styleUrls: ['./create-menu.component.scss'],
})
export class CreateMenuComponent implements OnInit {
    userId: number = 0
    menus: any[] = []
    //properties
    menuName: string = ''
    menuDescription: string = ''
    menuIsActive: boolean = true
    menuCafeId: number = 0

    constructor(
        private authService: AuthService,
        private menuService: MenuService,
        private localuserService: LocalUserService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.userId = this.authService.user$.getValue().id

        this.loadMenus()

        this.localuserService.getLocalUserByUserId(this.userId).subscribe({
            next: (response) => {
                this.menuCafeId = response.localId
            },
            error: (error) => console.error('Error getting local user:', error),
        })
    }

    loadMenus(): void {
        this.menuService.getMenuByLocalId(this.userId).subscribe({
            next: (response) => {
                this.menus = response
            },
            error: (error) => console.error('Error getting menus:', error),
        })
    }

    onSubmit(): void {
        const menuData = {
            name: this.menuName,
            description: this.menuDescription,
            isActive: this.menuIsActive,
            cafeId: this.menuCafeId,
        }

        this.menuService.createMenu(menuData).subscribe({
            next: (response) => {
                this.loadMenus()
            },
            error: (error) => console.error('Error creating menu:', error),
        })
    }

    deleteMenu(menuId: number): void {
        this.menuService.deleteMenu(menuId).subscribe({
            next: () => {
                console.log('Menu deleted successfully')
                this.loadMenus() // Reload menus to update the list
            },
            error: (err) => this.loadMenus(),
        })
    }

    detailsMenu(menuId: number): void {
        this.router.navigate([`/menu-details/${menuId}`])
    }
}
