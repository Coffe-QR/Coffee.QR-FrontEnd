import { Component, OnInit } from '@angular/core'
import { EventService } from '../event.service'
import { AuthService } from '../../../auth/auth.service'
import { User } from '../../../auth/model/user.model'
import { MatDialog } from '@angular/material/dialog'
import { EventDescriptionDialogComponent } from '../event-description-dialog/event-description-dialog.component'
import { Router } from '@angular/router'
import moment from 'moment'

@Component({
    selector: 'app-events-overview',
    templateUrl: './events-overview.component.html',
    styleUrl: './events-overview.component.scss',
})
export class EventsOverviewComponent implements OnInit {
    user: User | undefined
    events: any[] = []
    searchTerm: string = ''
    userId: number = 0
    startDate: string = ''
    endDate: string = ''
    allEvents: any[] = [] // Store all events

    constructor(
        private authService: AuthService,
        private eventService: EventService,
        private dialog: MatDialog,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.authService.user$.subscribe((user) => {
            this.user = user
        })
        this.userId = this.authService.user$.getValue().id

        this.loadEvents()
    }

    openDescriptionDialog(description: string): void {
        this.dialog.open(EventDescriptionDialogComponent, {
            panelClass: 'custom-dialog',
            data: { description: description },
        })
    }

    loadEvents(): void {
        this.eventService.getAllEventsByUserId(this.userId).subscribe({
            next: (data) => {
                this.allEvents = data

                this.events = this.allEvents.sort((a, b) => {
                    const dateA = moment(a.dateTime, 'YYYY-MM-DD') // Adjust date format as needed
                    const dateB = moment(b.dateTime, 'YYYY-MM-DD')
                    return dateA.diff(dateB)
                })
            },
            error: (err) => console.error('Failed to load events:', err),
        })
    }

    filterEvents(): void {
        if (this.startDate && this.endDate) {
            this.events = this.allEvents.filter((event) => {
                const eventDate = moment(event.dateTime)
                return eventDate.isBetween(
                    moment(this.startDate),
                    moment(this.endDate),
                    'days',
                    '[]'
                )
            })
        } else {
            this.events = this.allEvents
        }
    }

    deleteEvent(eventId: number): void {
        this.eventService.deleteEvent(eventId).subscribe({
            next: () => {
                console.log('Event deleted successfully')
                this.loadEvents() // Reload events to update the list
            },
            error: (err) => this.loadEvents(),
        })
    }

    manageTickets(eventId: number) {
        this.router.navigate(['/manage-event-tickets/', eventId])
    }
}
