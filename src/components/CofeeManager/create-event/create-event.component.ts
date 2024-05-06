import { Component, OnInit } from '@angular/core'
import { EventService } from '../event.service'
import { Router } from '@angular/router'
import { AuthService } from '../../../auth/auth.service'
import { User } from '../../../auth/model/user.model'

@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.component.html',
    styleUrl: './create-event.component.scss',
})
export class CreateEventComponent {
    user: User | undefined
    userId: number = 0
    eventName: string = ''
    eventDateTime: string = ''
    eventDescription: string = ''
    eventImage: string = ''

    constructor(
        private authService: AuthService,
        private eventService: EventService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.userId = this.authService.user$.getValue().id
    }

    onSubmit(): void {
        const formattedDateTime = new Date(this.eventDateTime).toISOString()

        const eventData = {
            name: this.eventName,
            dateTime: formattedDateTime,
            description: this.eventDescription,
            image: this.eventImage,
            userId: this.userId,
        }

        this.eventService.createEvent(eventData).subscribe({
            next: (response) => this.router.navigate(['/manager']),
            error: (error) => console.error('Error creating event:', error),
        })
    }
}
