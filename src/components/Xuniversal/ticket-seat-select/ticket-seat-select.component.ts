import { Component, OnInit } from '@angular/core'
import { ChartRendererConfigOptions } from '@seatsio/seatsio-types'
import { EmbeddableProps } from '@seatsio/seatsio-angular'
import { ActivatedRoute, Router } from '@angular/router'
import { EventService } from '../../CofeeManager/event.service'
import { SeatsioService } from '../seatsio.service'
import { AuthService } from '../../../auth/auth.service'
import { TicketService } from '../ticket.service'
import { ToastrService } from 'ngx-toastr'
import { TicketEventService } from '../ticket-event.service'
import { forkJoin, map, switchMap } from 'rxjs'

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
    tickets: any[] = []
    ticketEvents: any[] = []

    selectedSeats: any[] = []
    selectedCategory: string = ''
    cardId: number = 0

    config: EmbeddableProps<ChartRendererConfigOptions> & { totalpr: number } =
        {
            region: 'eu',
            workspaceKey: '2d3804d9-bcc2-44cd-b613-b2e5afb398cb',
            event: '',
            pricing: [],
            priceFormatter: (price) => '$' + price,
            onObjectSelected: (object) => {
                if (
                    this.selectedCategory === '' ||
                    object.category?.label === this.selectedCategory
                ) {
                    this.selectedSeats.push(object)
                    this.totalpr += Number(object.pricing.price)
                    this.quantity++
                    this.selectedCategory = object.category?.label ?? ''
                } else {
                    object.deselect()
                    this.toastService
                        .info(`Please select seats only from the "${this.selectedCategory}" category.
Tickets can be purchased from only one category at a time.`)
                }
            },
            onObjectDeselected: (object: any) => {
                this.quantity--
                this.totalpr -= Number(object.pricing.price)

                this.selectedSeats = this.selectedSeats.filter(
                    (seat) => seat.id !== object.id
                )
                if (this.selectedSeats.length === 0) {
                    this.selectedCategory = ''
                }
            },
            onChartRendered: (chart) => {
                chart.changeConfig({
                    filteredCategories: this.tickets.map(
                        (ticket) => ticket.type
                    ),
                })
            },
            totalpr: this.totalpr,
        }

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private eventService: EventService,
        private seatsioService: SeatsioService,
        private authService: AuthService,
        private ticketService: TicketService,
        private toastService: ToastrService,
        private ticketEventService: TicketEventService
    ) {}

    ngOnInit(): void {
        this.userId = this.authService.user$.getValue().id

        this.eventId = this.route.snapshot.params['eventId']

        this.eventService.getEventById(this.eventId).subscribe((event) => {
            this.eventName = this.sanitizeEventKey(event.name)
            this.config.event = this.eventName
        })

        this.ticketEventService
            .getAllByEventId(this.eventId)
            .pipe(
                switchMap((ticketEvents) => {
                    const cardRequests = ticketEvents.map((ticketEvent: any) =>
                        this.ticketService.getById(ticketEvent.cardId)
                    )

                    return forkJoin(cardRequests).pipe(
                        map((cards: any) =>
                            cards.map((card: any, index: any) => ({
                                category: card.type,
                                price: ticketEvents[index].price,
                            }))
                        )
                    )
                })
            )
            .subscribe(
                (pricingConfig) => {
                    this.config.pricing = pricingConfig
                    console.log('Configured Pricing:', this.config.pricing)
                },
                (error) => {
                    console.error(
                        'Failed to load ticket events or cards:',
                        error
                    )
                }
            )
    }

    sanitizeEventKey(key: string): string {
        return key.replace(/[^a-zA-Z0-9-]/g, '-')
    }

    onContinueToPayment(): void {
        if (this.userId === 0) {
            console.error('User not logged in')
            this.router.navigate(['/login'])
            return
        } else {
            this.ticketEventService
                .getAllByEventId(this.eventId)
                .subscribe((ticketEvents) => {
                    this.cardId = ticketEvents[0].cardId

                    alert(this.cardId)

                    const ticketUser = {
                        cardId: this.cardId,
                        userId: this.userId,
                        quantity: this.quantity,
                        amount: this.totalpr,
                        currency: 'usd',
                        paymentStatus: 'pending',
                        paymentMethod: 'card',
                    }

                    const seatLabels = this.selectedSeats.map(
                        (seat) => seat.label
                    )

                    this.router.navigate(['/payment'], {
                        state: {
                            ticketUser: ticketUser,
                            seatLabels: seatLabels,
                            eventName: this.eventName,
                        },
                    })
                })
        }
    }

    updateChartConfig(): void {
        if (this.config.onChartRendered) {
            this.config.onChartRendered({
                changeConfig: (config: any) => {
                    config.pricing = this.config.pricing
                },
            } as any)
        }
    }
}
