import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { TicketService } from '../../Xuniversal/ticket.service'
import { AuthService } from '../../../auth/auth.service'
import { EventService } from '../event.service'
import { LocalUserService } from '../../Xuniversal/local-user.service'
import { LocalService } from '../../Xuniversal/local.service'
import { SeatsioService } from '../../Xuniversal/seatsio.service'
import { ToastrService } from 'ngx-toastr'
import { take, tap } from 'rxjs'
import { TicketEventService } from '../../Xuniversal/ticket-event.service'

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

    localId: number = 0
    localChartKey: string = ''

    submitAttempted = false

    constructor(
        private authService: AuthService,
        private ticketService: TicketService,
        private eventService: EventService,
        private router: Router,
        private localUserService: LocalUserService,
        private localService: LocalService,
        private seatsioService: SeatsioService,
        private toastrService: ToastrService,
        private ticketEventService: TicketEventService
    ) {}

    ngOnInit(): void {
        this.userId = this.authService.user$.getValue().id

        this.eventService.getAllEventsByUserId(this.userId).subscribe({
            next: (response: any) => {
                this.events = response
            },
            error: (error) => console.error('Error getting events:', error),
        })

        this.localUserService.getLocalUserByUserId(this.userId).subscribe({
            next: (response: any) => {
                this.localService.getLocalById(response.localId).subscribe({
                    next: (response1: any) => {
                        this.localId = response1.id
                        this.localChartKey = response1.chartKey
                    },
                    error: (error) =>
                        console.error('Error getting local:', error),
                })
            },
            error: (error) => console.error('Error getting local user:', error),
        })
    }

    onSubmit(): void {
        const ticketData = {
            type: this.ticketType,
            note: this.ticketNote,
            localId: this.localId,
        }

        const categoryData = {
            chartKey: this.localChartKey,
            categoryKeyName: this.ticketType,
        }

        this.submitAttempted = true
        if (this.ticketPrice <= 0) {
            return
        }

        this.seatsioService.createCategory(categoryData).subscribe({
            next: () => {
                this.ticketService.createCard(ticketData).subscribe({
                    next: (response) => {
                        const ticketEventData = {
                            cardId: response.id,
                            price: this.ticketPrice,
                            eventId: this.ticketEventId,
                        }

                        this.ticketEventService
                            .createCardEvent(ticketEventData)
                            .subscribe({
                                next: () => {
                                    this.router.navigate([
                                        `/manage-event-tickets/${this.ticketEventId}`,
                                    ])
                                    this.toastrService.success(
                                        'Ticket created successfully!'
                                    )
                                },
                                error: (error) =>
                                    console.error(
                                        'Error creating ticket event:',
                                        error
                                    ),
                            })
                    },
                    error: (error) =>
                        console.error('Error creating ticket:', error),
                })
            },
            error: (error) => console.error('Error creating category:', error),
        })
    }
}
