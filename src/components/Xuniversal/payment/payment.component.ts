import { state, style } from '@angular/animations'
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { TicketUserService } from '../ticket-user.service'
import { TicketUser } from '../../../auth/model/ticket-user.model'

@Component({
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
    @ViewChild('paymentRef', { static: true }) paymentRef!: ElementRef

    amount: number = 0
    cardId: number = 0
    userId: number = 0
    quantity: number = 0
    currency: string = 'usd'
    //paymentStatus: string = ''
    //payPalPaymentIntentId: string = ''

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private ticketUserService: TicketUserService
    ) {
        const navigation = this.router.getCurrentNavigation()
        const state = navigation?.extras.state as { ticketUser: any }
        console.log(state?.ticketUser) // Here you can access the ticketUser object
        this.amount = state?.ticketUser.amount
        this.cardId = state?.ticketUser.cardId
        this.userId = state?.ticketUser.userId
        this.quantity = state?.ticketUser.quantity
    }

    ngOnInit() {
        window.paypal
            .Buttons({
                style: {
                    layout: 'vertical', // Default is horizontal
                    color: 'blue', // PayPal button color
                },
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
                            const ticketUser = {
                                cardId: this.cardId,
                                userId: this.userId,
                                quantity: this.quantity,
                                amount: this.amount,
                                currency: 'USD',
                                paymentStatus: details.status,
                                payPalPaymentIntentId: details.id,
                            }

                            this.ticketUserService
                                .createCardUser(ticketUser)
                                .subscribe({
                                    next: (response) => {
                                        this.router.navigate(
                                            ['/payment-completed'],
                                            {
                                                state: {
                                                    ticketUser: ticketUser,
                                                },
                                            }
                                        )
                                    },
                                    error: (error) =>
                                        console.error(
                                            'Error creating ticket user:',
                                            error
                                        ),
                                })
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
