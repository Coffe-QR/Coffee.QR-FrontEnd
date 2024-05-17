// stripe-payment.service.ts
import { Injectable } from '@angular/core'
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js'

@Injectable({
    providedIn: 'root',
})
export class StripePaymentService {
    private stripePromise: Promise<Stripe | null> = loadStripe(
        'pk_test_51PHOapEWRLVa2lFi4LmCZE6Wnt3AgZJR2UtQa13Brp0zc0LZMuMQX7ENimvIHoVPsPuO9797tKCSKQrykPdZmGRk00OOUYI5W8'
    )
    private stripeInstance: Stripe | null = null
    private elementsInstance: StripeElements | null = null

    constructor() {}

    async getStripeInstance(): Promise<Stripe | null> {
        if (!this.stripeInstance) {
            this.stripeInstance = await this.stripePromise
        }
        return this.stripeInstance
    }

    async getElements(): Promise<StripeElements | null> {
        if (!this.elementsInstance) {
            const stripe = await this.getStripeInstance()
            this.elementsInstance = stripe?.elements() ?? null
        }
        return this.elementsInstance
    }
}
