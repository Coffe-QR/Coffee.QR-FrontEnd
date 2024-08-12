import { Component, OnInit } from '@angular/core'
import { LocalRentService } from '../local-rent.service'
import { LocalUserService } from '../../Xuniversal/local-user.service'
import { AuthService } from '../../../auth/auth.service'
import { ToastrService } from 'ngx-toastr'

@Component({
    selector: 'app-create-price-list-for-rent',
    templateUrl: './create-price-list-for-rent.component.html',
    styleUrls: ['./create-price-list-for-rent.component.scss'],
})
export class CreatePriceListForRentComponent implements OnInit {
    userId: number = 0
    localId: number = 0
    currentPrice: number = 0
    price: number = 0
    pricingDate: string = ''
    //date now
    //isActive: boolean = true // mada back bi trebao da ga generise

    constructor(
        private localRentService: LocalRentService,
        private localUserService: LocalUserService,
        private authService: AuthService,
        private toastr: ToastrService
    ) {}

    ngOnInit() {
        this.userId = this.authService.user$.getValue().id

        this.localUserService.getLocalUserByUserId(this.userId).subscribe({
            next: (response) => {
                this.localId = response.localId
                this.localRentService
                    .getActiveLocalRentPriceList(this.localId)
                    .subscribe({
                        next: (response) => {
                            console.log(response)
                            if (response) {
                                this.currentPrice = response.price
                                this.pricingDate = response.pricingDate
                            }
                        },
                        error: (error) => {
                            console.log(error)
                        },
                    })
            },
            error: (error) => {
                console.log(error)
            },
        })
    }

    onSubmit() {
        const data = {
            localId: this.localId,
            price: this.price,
            pricingDate: new Date().toISOString().split('T')[0],
            isActive: true,
        }
        this.localRentService.createLocalRentPriceList(data).subscribe({
            next: (response) => {
                this.toastr.success('Rent price updated successfully')
                this.localRentService
                    .getActiveLocalRentPriceList(this.localId)
                    .subscribe({
                        next: (response) => {
                            console.log(response)
                            if (response) {
                                this.currentPrice = response.price
                                this.pricingDate = response.pricingDate
                                this.price = 0
                            }
                        },
                        error: (error) => {
                            console.log(error)
                        },
                    })
            },
            error: (error) => {
                console.log(error)
            },
        })
    }
}
