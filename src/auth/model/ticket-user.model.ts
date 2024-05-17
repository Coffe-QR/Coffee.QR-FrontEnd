export interface TicketUser {
    cardId: number
    userId: number
    quantity: number
    amount: number
    currency: string
    paymentStatus: string
    stripePaymentIntentId: string
    paymentMethod: string
}
