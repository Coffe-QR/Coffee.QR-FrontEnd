import { Component, OnInit } from '@angular/core'
import { EventManagerConfigOptions } from '@seatsio/seatsio-types'
import { EmbeddableProps } from '@seatsio/seatsio-angular'
import { EventService } from '../event.service'
import { ActivatedRoute } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { CategoriesInfoDialogComponent } from './categories-info-dialog/categories-info-dialog.component'
import { TicketService } from '../../Xuniversal/ticket.service'

@Component({
    selector: 'app-create-event-seat-map',
    templateUrl: './create-event-seat-map.component.html',
    styleUrl: './create-event-seat-map.component.scss',
})
export class CreateEventSeatMapComponent implements OnInit {
    eventId: number = 0
    categories: any[] = []

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
        private ticketService: TicketService
    ) {}

    ngOnInit(): void {
        this.eventId = this.route.snapshot.params['eventId']

        this.eventService.getEventById(this.eventId).subscribe({
            next: (event) => {
                this.eventManagerConfig.event = event.name
            },
            error: (err) => console.error('Failed to load event:', err),
        })

        this.ticketService.getAllByEventId(this.eventId).subscribe({
            next: (tickets) => {
                this.categories = tickets
                console.log('Tickets:', this.categories)
            },
            error: (err) => console.error('Failed to load tickets:', err),
        })
    }

    onShowCategoriesInfo(): void {
        this.dialog.open(CategoriesInfoDialogComponent, {
            panelClass: 'custom-dialog',
            data: { categories: this.categories },
        })
    }
}
