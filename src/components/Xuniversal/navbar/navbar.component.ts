import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../../auth/auth.service'
import { User } from '../../../auth/model/user.model'

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
    navbarOpen = false
    user: User | undefined
    isDropdownOpen: boolean = false
    isOpenSupply: boolean = false

    constructor(private authService: AuthService) {}

    toggleDropdown(event: Event) {
        event.stopPropagation()
        this.isDropdownOpen = !this.isDropdownOpen
    }

    ngOnInit(): void {
        this.authService.user$.subscribe((user) => {
            this.user = user
        })
    }

    toggleNavbar() {
        this.navbarOpen = !this.navbarOpen
    }

    logout() {
        this.authService.logout()
    }
    //test
    toggleDropdownSupply() {
        this.isOpenSupply = !this.isOpenSupply
    }
}
