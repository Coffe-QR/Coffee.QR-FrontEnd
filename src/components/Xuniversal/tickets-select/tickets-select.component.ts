import { Component, OnInit } from '@angular/core'
import { EventService } from '../../CofeeManager/event.service'
import { LocalService } from '../local.service'
import { Event } from '../../../auth/model/event.model'
import { ActivatedRoute } from '@angular/router'
import { Local } from '../../../auth/model/local.model'
import { AuthService } from '../../../auth/auth.service'
import { Router } from '@angular/router'

@Component({
    selector: 'app-tickets-select',
    templateUrl: './tickets-select.component.html',
    styleUrl: './tickets-select.component.scss',
})
export class TicketsSelectComponent implements OnInit {
    event: Event | undefined
    local: Local | undefined
    userId: number = 0

    constructor(
        private eventService: EventService,
        private localService: LocalService,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.userId = this.authService.user$.getValue().id

        const eventId = this.route.snapshot.params['eventId']

        this.eventService.getEventById(eventId).subscribe((event) => {
            console.log('Event:', event)
            this.event = event

            if (this.event) {
                this.localService
                    .getLocalById(this.event.localId)
                    .subscribe((local) => {
                        this.local = local
                    })
            }
        })
    }

    onContinueToPayment(): void {
        if (this.userId === 0) {
            console.error('User not logged in')
            this.router.navigate(['/login'])
            return
        } else {
            console.log('Continue to payment')
        }
    }
}
