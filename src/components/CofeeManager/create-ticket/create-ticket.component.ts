import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { TicketService } from '../../Xuniversal/ticket.service'
import { AuthService } from '../../../auth/auth.service'
import { EventService } from '../event.service'

@Component({
    selector: 'app-create-ticket',
    templateUrl: './create-ticket.component.html',
    styleUrls: ['./create-ticket.component.scss'],
})
export class CreateTicketComponent implements OnInit {
    userId: number = 0
    events: any[] = []

    //properties
    ticketType: string = ''
    ticketPrice: number = 0
    ticketNote: string = ''
    ticketEventId: any

    submitAttempted = false

    constructor(
        private authService: AuthService,
        private ticketService: TicketService,
        private eventService: EventService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.userId = this.authService.user$.getValue().id

        this.eventService.getAllEventsByUserId(this.userId).subscribe({
            next: (response: any) => {
                this.events = response
            },
            error: (error) => console.error('Error getting events:', error),
        })
    }

    onSubmit(): void {
        const ticketData = {
            type: this.ticketType,
            price: this.ticketPrice,
            note: this.ticketNote,
            eventId: this.ticketEventId,
        }

        this.submitAttempted = true
        if (this.ticketPrice <= 0) {
            return
        }

        this.ticketService.createCard(ticketData).subscribe({
            next: (response) => {
                this.router.navigate(['/manager'])
            },
            error: (error) => console.error('Error creating ticket:', error),
        })
    }
}
