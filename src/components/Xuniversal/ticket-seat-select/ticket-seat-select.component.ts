import { Component, OnInit } from '@angular/core'
import { ChartRendererConfigOptions } from '@seatsio/seatsio-types'
import { EmbeddableProps } from '@seatsio/seatsio-angular'
import { ActivatedRoute, Router } from '@angular/router'
import { EventService } from '../../CofeeManager/event.service'
import { SeatsioService } from '../seatsio.service'
import { AuthService } from '../../../auth/auth.service'

@Component({
    selector: 'app-ticket-seat-select',
    templateUrl: './ticket-seat-select.component.html',
    styleUrls: ['./ticket-seat-select.component.scss'],
})
export class TicketSeatSelectComponent implements OnInit {
    eventId: number = 0
    eventName: string = ''
    totalpr: number = 0
    userId: number = 0
    quantity: number = 0
    totalPrice: number = 0

    selectedSeats: any[] = []

    config: EmbeddableProps<ChartRendererConfigOptions> & { totalpr: number }

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private eventService: EventService,
        private seatsioService: SeatsioService,
        private authService: AuthService
    ) {
        this.config = {
            region: 'eu',
            workspaceKey: '2d3804d9-bcc2-44cd-b613-b2e5afb398cb',
            event: '', // Initially empty, will be set in ngOnInit
            pricing: [
                { category: 'Stolovi', price: 100 },
                { category: 'Separei', price: 250 },
            ],
            priceFormatter: (price) => '$' + price,
            onObjectSelected: (object) => {
                console.log(object)
                this.selectedSeats.push(object)
                this.totalpr += Number(object.pricing.price)
            },
            onChartRendered: (chart) => {
                chart.changeConfig({
                    filteredCategories: ['Stolovi', 'Separei'],
                })
                chart.zoomToFilteredCategories()
            },
            totalpr: this.totalpr,
        }
    }

    ngOnInit(): void {
        this.userId = this.authService.user$.getValue().id

        this.eventId = this.route.snapshot.params['eventId']

        this.eventService.getEventById(this.eventId).subscribe((event) => {
            this.eventName = this.sanitizeEventKey(event.name)
            this.config.event = this.eventName // Set the event name dynamically
        })
    }

    sanitizeEventKey(key: string): string {
        return key.replace(/[^a-zA-Z0-9-]/g, '-')
    }

    onContinueToPayment(): void {
        // if (this.userId === 0) {
        //     console.error('User not logged in')
        //     this.router.navigate(['/login'])
        //     return
        // }

        const ticketUser = {
            cardId: 69,
            userId: this.userId || 50,
            quantity: this.quantity,
            amount: this.totalpr,
            currency: 'usd',
            paymentStatus: 'pending',
            //stripePaymentIntentId: '',
            paymentMethod: 'card',
        }

        console.log('Selected Seats:', this.selectedSeats)

        // Extract seat labels from selectedSeats
        const seatLabels = this.selectedSeats.map((seat) => seat.label)

        // Call backend API to book seats
        this.seatsioService.bookSeats(this.eventName, seatLabels).subscribe(
            () => {
                alert('Seats booked successfully!')
                this.router.navigate(['/payment'], {
                    state: { ticketUser: ticketUser },
                })
            },
            (error) => {
                console.error('Error booking seats:', error)
                alert('Failed to book seats. Please try again later.')
            }
        )
    }
}
