import { Component, OnInit } from '@angular/core'
import { EventService } from '../event.service'
import { UploadService } from '../../../shared/upload.service'
import { Router } from '@angular/router'
import { AuthService } from '../../../auth/auth.service'
import { User } from '../../../auth/model/user.model'
import { LocalUserService } from '../../Xuniversal/local-user.service'

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
            next: (response) => this.router.navigate(['/manager']),
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
}
