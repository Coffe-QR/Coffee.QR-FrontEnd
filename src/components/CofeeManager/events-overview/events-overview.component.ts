import { Component, OnInit } from '@angular/core'
import { EventService } from '../event.service'
import { AuthService } from '../../../auth/auth.service'
import { User } from '../../../auth/model/user.model'
import { MatDialog } from '@angular/material/dialog'
import { EventDescriptionDialogComponent } from '../event-description-dialog/event-description-dialog.component'
import { AUTO_STYLE } from '@angular/animations'

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

    constructor(
        private authService: AuthService,
        private eventService: EventService,
        private dialog: MatDialog
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
                this.events = data
            },
            error: (err) => console.error('Failed to load events:', err),
        })
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
}
