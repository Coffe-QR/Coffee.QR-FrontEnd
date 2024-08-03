import { Component, OnInit } from '@angular/core'
import { EventService } from '../event.service'
import { UploadService } from '../../../shared/upload.service'
import { Router } from '@angular/router'
import { AuthService } from '../../../auth/auth.service'
import { User } from '../../../auth/model/user.model'
import { LocalUserService } from '../../Xuniversal/local-user.service'
import flatpickr from 'flatpickr'
import { format, isSameDay, parse, parseISO } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'

@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent implements OnInit {
    user: User | undefined
    userId: number = 0
    eventName: string = ''
    eventDateTime: string = ''
    eventDescription: string = ''
    eventImage: string = ''
    eventLocalId: number = 0
    disabledDates: Date[] = []
    events: any[] = []

    constructor(
        private authService: AuthService,
        private eventService: EventService,
        private uploadService: UploadService,
        private localuserService: LocalUserService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.userId = this.authService.user$.getValue().id

        this.localuserService.getLocalUserByUserId(this.userId).subscribe({
            next: (response) => {
                this.eventLocalId = response.localId
                this.eventService
                    .getEventsByLocalId(this.eventLocalId)
                    .subscribe({
                        next: (response) => {
                            this.events = response
                            console.log('Events:', response)
                            this.initializeFlatpickr(response)
                        },
                        error: (error) =>
                            console.error('Error getting events:', error),
                    })
            },
            error: (error) => console.error('Error getting local user:', error),
        })
    }

    onSubmit(): void {
        const formattedDateTime = new Date(this.eventDateTime).toISOString()

        const eventData = {
            name: this.eventName,
            dateTime: formattedDateTime,
            description: this.eventDescription,
            image: this.eventImage,
            userId: this.userId,
            localId: this.eventLocalId,
        }

        this.eventService.createEvent(eventData).subscribe({
            next: (response) => {
                this.router.navigate(['create-ticket-for-event/', response.id])
            },
            error: (error) => console.error('Error creating event:', error),
        })
    }

    onFileSelected(event: any): void {
        const file: File = event.target.files[0]

        if (file) {
            this.uploadService.uploadImage(file).subscribe({
                next: (response) => {
                    this.eventImage = response.path
                },
                error: (error) => {
                    console.error('Error uploading image:', error)
                },
            })
        }
    }
    initializeFlatpickr(events: any[]): void {
        const eventDates = events.map((event) => new Date(event.dateTime))
        flatpickr('#datePicker', {
            enableTime: true,
            time_24hr: true,
            dateFormat: 'Y-m-d\\TH:i',
            altInput: true,
            altFormat: 'd/m/Y H:i',
            minDate: new Date(),
            disable: eventDates,
            onDayCreate: (dObj, dStr, fp, dayElem) => {
                eventDates.forEach((eventDate, index) => {
                    if (isSameDay(dayElem.dateObj, eventDate)) {
                        const name = events[index].name
                        dayElem.title = name
                        dayElem.classList.add('event-day')
                    }
                })
            },
        })
    }
}
