import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
    selector: 'app-payment-completed',
    templateUrl: './payment-completed.component.html',
    styleUrl: './payment-completed.component.scss',
})
export class PaymentCompletedComponent implements OnInit {
    amount: number = 0
    cardId: number = 0
    userId: number = 0
    quantity: number = 0
    currency: string = 'usd'
    paymentStatus: string = ''
    payPalPaymentIntentId: string = ''

    constructor(private router: Router) {
        const navigation = this.router.getCurrentNavigation()
        const state = navigation?.extras.state as { ticketUser: any }
        console.log(state?.ticketUser) // Here you can access the ticketUser object
        this.amount = state?.ticketUser.amount
        this.cardId = state?.ticketUser.cardId
        this.userId = state?.ticketUser.userId
        this.quantity = state?.ticketUser.quantity
        this.paymentStatus = state?.ticketUser.paymentStatus
        this.payPalPaymentIntentId = state?.ticketUser.payPalPaymentIntentId
    }

    ngOnInit(): void {}
}
