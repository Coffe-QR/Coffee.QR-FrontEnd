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
import { TicketUserService } from '../ticket-user.service'
import { TicketEventService } from '../ticket-event.service'

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
    tickets: any[] = []
    selectedType: string = ''
    quantity: number = 1
    totalPrice: number = 0

    cat1: any[] = []

    constructor(
        private eventService: EventService,
        private localService: LocalService,
        private authService: AuthService,
        private ticketService: TicketService,
        private ticketEventService: TicketEventService,
        private ticketUserService: TicketUserService,
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
    }

    onContinueToPayment(): void {
        this.router.navigate(['/ticket-seat-select/', this.eventId])
    }
}
