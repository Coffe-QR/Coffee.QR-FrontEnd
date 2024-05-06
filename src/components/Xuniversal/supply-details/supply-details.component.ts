import { Component } from '@angular/core'
import { SupplyItem } from '../../../auth/model/supply-item.model'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../../../auth/auth.service'
import { User } from '../../../auth/model/user.model'
import { SupplyService } from '../../CofeeManager/supply.service'
import { SupplyItemService } from '../../CofeeManager/supply-item.service'
import { Supply } from '../../../auth/model/supply.model'

@Component({
    selector: 'app-supply-details',
    templateUrl: './supply-details.component.html',
    styleUrl: './supply-details.component.scss',
})
export class SupplyDetailsComponent {
    supplyItems: SupplyItem[] = []
    supplyId: number | null = null
    user: User | null = null
    totalPrice: number = 0

    constructor(
        private route: ActivatedRoute,
        private authService: AuthService,
        private supplyItemService: SupplyItemService,
        private supplyService: SupplyService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.supplyId = Number(params.get('supplyId'))
            this.supplyItemService.getAllForSupply(this.supplyId).subscribe({
                next: (response) => {
                    this.supplyItems = response
                },
                error: (error) => console.error('Error creating event:', error),
            })
        })
        this.authService.user$.subscribe((user) => {
            this.user = user
        })
    }

    calculateTotalPrice(item: SupplyItem): number {
        return item.quantity * item.price
    }

    getTotalPrice() {
        this.supplyItems.forEach((item) => {
            this.totalPrice += this.calculateTotalPrice(item)
        })
        return this.totalPrice
    }

    orderAgain(): void {
        let supply: Supply = {
            id: 0,
            companyId: 0,
            totalPrice: 0,
            status: 2,
        }
        supply.totalPrice = this.getTotalPrice()
        this.supplyService.createSupply(supply).subscribe({
            next: (response) => {
                supply = response
                let items = this.supplyItems
                items.forEach((item) => (item.supplyId = supply.id))
                this.supplyItemService.createSupplyItems(items).subscribe({
                    next: (response) =>
                        alert('You have successfully completed the purchase.'),
                    error: (error) =>
                        console.error('Error creating supply items:', error),
                })
            },
            error: (error) => console.error('Error creating supply:', error),
        })
    }

    edit(): void {
        if (this.supplyId !== null)
            localStorage.setItem('supply', this.supplyId?.toString())
        this.router.navigate(['/supply-create'])
    }
}
