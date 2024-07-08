import { Component, OnInit } from '@angular/core'
import { EventManagerConfigOptions } from '@seatsio/seatsio-types'
import { EmbeddableProps } from '@seatsio/seatsio-angular'
import { EventService } from '../event.service'
import { ActivatedRoute } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { CategoriesInfoDialogComponent } from './categories-info-dialog/categories-info-dialog.component'
import { TicketService } from '../../Xuniversal/ticket.service'
import { TicketEventService } from '../../Xuniversal/ticket-event.service'

@Component({
    selector: 'app-manage-event-tickets',
    templateUrl: './manage-event-tickets.component.html',
    styleUrl: './manage-event-tickets.component.scss',
})
export class ManageEventTicketsComponent {
    eventId: number = 0
    categories: any[] = []
    cat1: any[] = []
    eventName: string = ''

    eventManagerConfig: EmbeddableProps<EventManagerConfigOptions> = {
        region: 'eu',
        secretKey: '709f52bc-9892-4334-b511-99fe2a56646a',
        event: '',
        mode: 'manageCategories',
    }

    constructor(
        private eventService: EventService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private ticketService: TicketService,
        private ticketEventService: TicketEventService
    ) {}

    ngOnInit(): void {
        this.eventId = this.route.snapshot.params['eventId']

        this.eventService.getEventById(this.eventId).subscribe({
            next: (event) => {
                this.eventName = event.name
                this.eventManagerConfig.event = this.sanitizeEventKey(
                    event.name
                )
            },
            error: (err) => console.error('Failed to load event:', err),
        })

        this.ticketEventService.getAllByEventId(this.eventId).subscribe({
            next: (tickets) => {
                this.categories = tickets
                this.categories.forEach((category) => {
                    this.ticketService.getById(category.cardId).subscribe({
                        next: (ticket) => {
                            this.cat1.push({
                                id: category.id,
                                type: ticket.type,
                                price: category.price,
                                note: ticket.note,
                            })
                        },
                        error: (err) =>
                            console.error('Failed to load ticket:', err),
                    })
                })
            },
            error: (err) => console.error('Failed to load tickets:', err),
        })
    }

    sanitizeEventKey(key: string): string {
        return key.replace(/[^a-zA-Z0-9-]/g, '-')
    }

    onShowCategoriesInfo(): void {
        this.dialog.open(CategoriesInfoDialogComponent, {
            panelClass: 'custom-dialog',
            data: { categories: this.cat1 },
        })
    }
}
