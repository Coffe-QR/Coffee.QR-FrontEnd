import { style } from '@angular/animations'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { TicketUserService } from '../ticket-user.service'

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
    amount: number = 10
    @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef

    constructor(
        private router: Router,
        private ticketuserService: TicketUserService
    ) {}

    ngOnInit() {
        window.paypal
            .Buttons({
                // style: {
                //     layout: 'horizontal',
                //     color: 'gold',
                //     shape: 'rect',
                //     label: 'paypal',
                //     tagline: 'pay with card',
                // },
                createOrder: (data: any, actions: any) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: this.amount.toString(),
                                    currency_code: 'USD',
                                },
                            },
                        ],
                    })
                },
                onApprove: (data: any, actions: any) => {
                    return actions.order.capture().then((details: any) => {
                        if (details.status === 'COMPLETED') {
                            //DODAJ OVDE STA TI TREBA ZA TVOJU KLASU
                            alert(
                                'Transaction completed by ' +
                                    details.payer.name.given_name
                            )
                            this.router.navigate(['/all-events-overview'])
                        }
                    })
                },
                onError: (err: any) => {
                    alert('Transaction failed')
                    console.log(err)
                },
            })
            .render(this.paymentRef.nativeElement)
    }

    cancel() {
        this.router.navigate(['/all-events-overview'])
    }
}
