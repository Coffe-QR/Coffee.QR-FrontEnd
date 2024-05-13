import { Component, OnInit } from '@angular/core'
import { trigger, state, style, transition, animate } from '@angular/animations'
import { AuthService } from '../../../auth/auth.service'
import { User } from '../../../auth/model/user.model'

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    animations: [
        trigger('dropdown', [
            transition(':enter', [
                style({ opacity: 0, height: 0 }),
                animate('200ms ease-out', style({ opacity: 1, height: '*' })),
            ]),
            transition(':leave', [
                animate('200ms ease-out', style({ opacity: 0, height: 0 })),
            ]),
        ]),
    ],
})
export class NavbarComponent implements OnInit {
    navbarOpen = false
    user: User | undefined

    dropdowns: { [key: string]: boolean } = {}

    isOpenSupply: boolean = false
    closeTimer: any

    openDropdown(dropdownId: string): void {
        this.dropdowns[dropdownId] = true
        clearTimeout(this.closeTimer)
    }

    startChecking(dropdownId: string): void {
        this.closeTimer = setTimeout(() => {
            this.dropdowns[dropdownId] = false
        }, 10)
    }

    stopChecking(): void {
        clearTimeout(this.closeTimer)
    }

    closeDropdown(dropdownId: string): void {
        this.startChecking(dropdownId)
    }

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.user$.subscribe((user) => {
            this.user = user
        })
        this.dropdowns = {
            supply: false,
            event: false,
        }
    }

    toggleNavbar() {
        this.navbarOpen = !this.navbarOpen
    }

    logout() {
        this.authService.logout()
    }

    getRouteBasedOnRole() {
        if (this.user) {
            switch (this.user.role) {
                case 'manager':
                    return '/manager'
                case 'client':
                    return '/client'
                case 'bartender':
                    return '/bartender'
                case 'it-support':
                    return '/it-support'
                case 'waiter':
                    return '/waiter'
                default:
                    return '/home'
            }
        } else {
            return '/home'
        }
    }
}
