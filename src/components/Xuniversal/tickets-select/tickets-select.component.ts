import { Component, OnInit } from '@angular/core'
import { EventService } from '../../CofeeManager/event.service'
import { LocalService } from '../local.service'
import { Event } from '../../../auth/model/event.model'
import { ActivatedRoute } from '@angular/router'
import { Local } from '../../../auth/model/local.model'
import { AuthService } from '../../../auth/auth.service'
import { Router } from '@angular/router'
import { TicketService } from '../ticket.service'
import { Ticket } from '../../../auth/model/ticket.model'

@Component({
    selector: 'app-tickets-select',
    templateUrl: './tickets-select.component.html',
    styleUrl: './tickets-select.component.scss',
})
export class TicketsSelectComponent implements OnInit {
    event: Event | undefined
    eventId: number = 0
    local: Local | undefined
    userId: number = 0
    tickets: Ticket[] = []
    selectedType: string = ''
    quantity: number = 1
    totalPrice: number = 0

    constructor(
        private eventService: EventService,
        private localService: LocalService,
        private authService: AuthService,
        private ticketService: TicketService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.userId = this.authService.user$.getValue().id

        this.eventId = this.route.snapshot.params['eventId']

        this.eventService.getEventById(this.eventId).subscribe((event) => {
            this.event = event

            if (this.event) {
                this.localService
                    .getLocalById(this.event.localId)
                    .subscribe((local) => {
                        this.local = local
                    })
            }
        })

        this.ticketService
            .getAllByEventId(this.eventId)
            .subscribe((tickets) => {
                this.tickets = tickets
            })
    }

    onContinueToPayment(): void {
        if (this.userId === 0) {
            console.error('User not logged in')
            this.router.navigate(['/login'])
            return
        } else {
            console.log('Continue to payment')
        }
    }

    getTotalPrice(): void {
        if (!this.selectedType || !this.eventId) {
            this.totalPrice = 0
            return
        }

        const ticket = this.tickets.find(
            (t) => +t.eventId === +this.eventId && t.type === this.selectedType
        )

        if (ticket) {
            this.totalPrice = ticket.price * this.quantity
        } else {
            console.error('No ticket found for the selected type and event')
            this.totalPrice = 0
        }
    }
}
