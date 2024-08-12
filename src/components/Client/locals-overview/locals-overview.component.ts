import { Component, OnInit } from '@angular/core'
import { LocalService } from '../../Xuniversal/local.service'

@Component({
    selector: 'app-locals-overview',
    templateUrl: './locals-overview.component.html',
    styleUrls: ['./locals-overview.component.scss'],
})
export class LocalsOverviewComponent implements OnInit {
    locals: any[] = []

    constructor(private localService: LocalService) {}

    ngOnInit(): void {
        this.localService
            .getAllLocalsWithActiveRentPriceList()
            .subscribe((locals) => {
                this.locals = locals

                this.locals.sort((a, b) => {
                    const priceA = a.activeRentPrice ?? Infinity
                    const priceB = b.activeRentPrice ?? Infinity
                    return priceA - priceB
                })
            })
    }
}
