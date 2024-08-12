import { Component, OnInit } from '@angular/core'
import { LocalService } from '../../Xuniversal/local.service'
import { Route, Router } from '@angular/router'

@Component({
    selector: 'app-locals-overview',
    templateUrl: './locals-overview.component.html',
    styleUrls: ['./locals-overview.component.scss'],
})
export class LocalsOverviewComponent implements OnInit {
    locals: any[] = []

    constructor(
        private localService: LocalService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.localService
            .getAllLocalsWithActiveRentPriceList()
            .subscribe((locals) => {
                this.locals = locals
                console.log(this.locals)

                this.locals.sort((a, b) => {
                    const priceA = a.activeRentPrice ?? Infinity
                    const priceB = b.activeRentPrice ?? Infinity
                    return priceA - priceB
                })
            })
    }

    showDetails(local: any, price: any): void {
        this.localService.setPrice(price)
        this.router.navigate(['/rent-offer/', local.id])
    }
}
