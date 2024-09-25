import { Component, OnInit } from '@angular/core'
import { User } from '../../../auth/model/user.model'
import { AuthService } from '../../../auth/auth.service'

@Component({
    selector: 'app-warehouseman-landing-page',
    templateUrl: './warehouseman-landing-page.component.html',
    styleUrl: './warehouseman-landing-page.component.scss',
})
export class WarehousemanLandingPageComponent implements OnInit {
    user: User | undefined

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.user$.subscribe((user) => {
            this.user = user
        })
    }

    onLogout(): void {
        this.authService.logout()
    }
}
