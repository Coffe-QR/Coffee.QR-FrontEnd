import { Component, OnInit } from '@angular/core'
import { EmbeddableProps } from '@seatsio/seatsio-angular'
import { ChartRendererConfigOptions } from '@seatsio/seatsio-types'
import { EventService } from '../../CofeeManager/event.service'
import { ActivatedRoute } from '@angular/router'
import flatpickr from 'flatpickr'
import { format, isSameDay, parse, parseISO } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'

@Component({
    selector: 'app-rent-offer',
    templateUrl: './rent-offer.component.html',
    styleUrls: ['./rent-offer.component.scss'],
})
export class RentOfferComponent implements OnInit {
    localId: number = 0
    eventName: string = ''
    rentDateTime: string = ''
    events: any[] = []

    config: EmbeddableProps<ChartRendererConfigOptions> = {
        region: 'eu',
        workspaceKey: '2d3804d9-bcc2-44cd-b613-b2e5afb398cb',
        event: '',
        numberOfPlacesToSelect: 1,
    }

    sanitizeEventKey(key: string): string {
        return key.replace(/[^a-zA-Z0-9-]/g, '-')
    }

    constructor(
        private eventService: EventService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.localId = this.route.snapshot.params['localId']

        this.eventService
            .getEventsByLocalId(this.localId)
            .subscribe((events) => {
                this.events = events
                this.initializeFlatpickr(events)
                this.eventName = this.sanitizeEventKey(events[0].name)
                this.config.event = this.eventName
            })
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
