import { Component, OnInit } from '@angular/core'
import { trigger, state, style, transition, animate } from '@angular/animations'
import { AuthService } from '../../../auth/auth.service'
import { User } from '../../../auth/model/user.model'
import { OrderService } from '../order.service'
import { ToastrService } from 'ngx-toastr'

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
    userId: number = 0

    dropdowns: { [key: string]: boolean } = {}

    isOpenSupply: boolean = false
    closeTimer: any

    openDropdown(dropdownId: string): void {
        this.dropdowns[dropdownId] = true
        this.cancelTimer()
    }

    startChecking(dropdownId: string): void {
        this.cancelTimer() // Make sure to cancel existing timer if moving within dropdowns
        this.closeTimer = setTimeout(() => {
            this.closeDropdown(dropdownId)
        }, 0) // Delay before closing dropdown
    }

    stopChecking(): void {
        this.cancelTimer() // Cancel any running timer when mouse enters any dropdown
    }

    closeDropdown(dropdownId: string): void {
        this.dropdowns[dropdownId] = false
    }

    private cancelTimer(): void {
        if (this.closeTimer) {
            clearTimeout(this.closeTimer)
            this.closeTimer = null
        }
    }

    constructor(
        private authService: AuthService,
        private orderService: OrderService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.authService.user$.subscribe((user) => {
            this.user = user
        })
        this.userId = this.authService.user$.getValue().id
        this.dropdowns = {
            supply: false,
            event: false,
        }
    }

    getNavbarClass() {
        if (this.user && this.user.role === 'manager') {
            return 'inherit'
        } else if (this.user && this.user.role === 'itsupport') {
            return 'inherit'
        } else if (this.user && this.user.role === 'waiter') {
            return 'inherit'
        } else {
            return 'inherit'
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
                    return '/notifications-overview-bartender'
                case 'itsupport':
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

    getAllOrders(): void {
        this.orderService.export(this.userId).subscribe({
            next: (data) => {
                this.toastr.info('Order information sent to your email')
            },
            error: (err) => console.error('Failed to export data:', err),
        })
    }
}
