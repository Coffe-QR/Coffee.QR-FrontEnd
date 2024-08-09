import { Component, OnInit } from '@angular/core'
import { TicketUserService } from '../../Xuniversal/ticket-user.service'
import { AuthService } from '../../../auth/auth.service'
import { TicketService } from '../../Xuniversal/ticket.service'
import { EventService } from '../../CofeeManager/event.service'
import { TicketEventService } from '../../Xuniversal/ticket-event.service'
import { forkJoin } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

@Component({
    selector: 'app-tickets-overview',
    templateUrl: './tickets-overview.component.html',
    styleUrls: ['./tickets-overview.component.scss'],
})
export class TicketsOverviewComponent implements OnInit {
    userId: number = 0
    allTickets: any[] = []
    pastTickets: any[] = []
    activeTickets: any[] = []
    displayedTickets: any[] = []
    showActiveTickets: boolean = true

    constructor(
        private ticketUserService: TicketUserService,
        private ticketService: TicketService,
        private ticketEventService: TicketEventService,
        private eventService: EventService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.userId = this.authService.user$.getValue().id

        this.ticketUserService.getByUserId(this.userId).subscribe({
            next: (response) => {
                const ticketRequests = response.map((user: any) => {
                    return this.ticketService.getById(user.cardId).pipe(
                        map((cardData) => ({
                            amount: user.amount,
                            quantity: user.quantity,
                            type: cardData.type,
                            cardId: user.cardId,
                        })),
                        switchMap((ticket) =>
                            this.ticketEventService
                                .getByCardIdAsync(ticket.cardId)
                                .pipe(
                                    switchMap((ticketEvent) =>
                                        this.eventService
                                            .getEventById(ticketEvent.eventId)
                                            .pipe(
                                                map((eventData) => ({
                                                    ...ticket,
                                                    eventName: eventData.name,
                                                    eventDateTime: new Date(
                                                        eventData.dateTime
                                                    ),
                                                }))
                                            )
                                    )
                                )
                        )
                    )
                })

                forkJoin(ticketRequests).subscribe({
                    next: (ticketDetails: any) => {
                        this.allTickets = ticketDetails
                        this.filterTickets()
                    },
                    error: (err) =>
                        console.error('Error fetching ticket details:', err),
                })
            },
            error: (error) => console.error('Error getting tickets:', error),
        })
    }

    filterTickets(): void {
        const now = new Date()
        this.pastTickets = this.allTickets.filter(
            (ticket) => ticket.eventDateTime < now
        )
        this.activeTickets = this.allTickets.filter(
            (ticket) => ticket.eventDateTime >= now
        )
        this.displayedTickets = this.showActiveTickets
            ? this.activeTickets
            : this.pastTickets
    }

    toggleTickets(): void {
        this.showActiveTickets = !this.showActiveTickets
        this.displayedTickets = this.showActiveTickets
            ? this.activeTickets
            : this.pastTickets
    }
}
