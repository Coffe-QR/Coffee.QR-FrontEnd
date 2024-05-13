import { Component } from '@angular/core'
import { Supply } from '../../../auth/model/supply.model'
import { SupplyService } from '../../CofeeManager/supply.service'
import { Router } from '@angular/router'

@Component({
    selector: 'app-supply-status',
    templateUrl: './supply-status.component.html',
    styleUrl: './supply-status.component.scss',
})
export class SupplyStatusComponent {
    supplies: Supply[] = []
    suppliesDisplaying: Supply[] = []

    constructor(
        private supplyService: SupplyService,
        private router: Router
    ) {}

    ngOnInit() {
        this.supplyService.getAllSupplies().subscribe({
            next: (response) => {
                this.supplies = response
                this.suppliesDisplaying = response
            },
            error: (error) => console.error('Error creating event:', error),
        })
    }

    getStatusText(status: number): string {
        switch (status) {
            case 0:
                return 'In Progress'
            case 1:
                return 'End'
            case 2:
                return 'Created'
            default:
                return 'Unknown'
        }
    }

    details(item: Supply): void {
        this.router.navigate(['supply-details/', item.id])
    }
}
