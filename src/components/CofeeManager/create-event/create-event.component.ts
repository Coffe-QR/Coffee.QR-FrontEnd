import { Component } from '@angular/core'
import { EventService } from '../event.service'
import { Router } from '@angular/router'

@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.component.html',
    styleUrl: './create-event.component.scss',
})
export class CreateEventComponent {
    eventName: string = ''
    eventDateTime: string = ''

    constructor(
        private eventService: EventService,
        private router: Router
    ) {}

    onSubmit(): void {
        const formattedDateTime = new Date(this.eventDateTime).toISOString()

        const eventData = {
            name: this.eventName,
            dateTime: formattedDateTime,
        }

        this.eventService.createEvent(eventData).subscribe({
            next: (response) => this.router.navigate(['/manager']),
            error: (error) => console.error('Error creating event:', error),
        })
    }
}
