import { Component, OnInit } from '@angular/core'
import { EmbeddableProps } from '@seatsio/seatsio-angular'
import { ChartRendererConfigOptions } from '@seatsio/seatsio-types'
import { EventService } from '../../CofeeManager/event.service'
import { ActivatedRoute } from '@angular/router'
import flatpickr from 'flatpickr'
import { format, isSameDay, parse, parseISO } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
import Swal from 'sweetalert2'
import { LocalService } from '../../Xuniversal/local.service'
import { AuthService } from '../../../auth/auth.service'
import { RentOfferService } from '../rent-offer.service'

@Component({
    selector: 'app-rent-offer',
    templateUrl: './rent-offer.component.html',
    styleUrls: ['./rent-offer.component.scss'],
})
export class RentOfferComponent implements OnInit {
    localId: number = 0
    localName: string = ''
    eventName: string = ''
    rentDateTime: string = ''
    formattedRentDateTime: string = ''
    events: any[] = []
    price: number = 0
    userId: number = 0

    config: EmbeddableProps<ChartRendererConfigOptions> = {
        region: 'eu',
        workspaceKey: '2d3804d9-bcc2-44cd-b613-b2e5afb398cb',
        event: '',

        mode: 'static',
    }

    sanitizeEventKey(key: string): string {
        return key.replace(/[^a-zA-Z0-9-]/g, '-')
    }

    constructor(
        private eventService: EventService,
        private route: ActivatedRoute,
        private localService: LocalService,
        private authService: AuthService,
        private rentOfferService: RentOfferService
    ) {}

    ngOnInit(): void {
        this.userId = this.authService.user$.getValue().id
        this.localId = this.route.snapshot.params['localId']

        this.price = this.localService.getPrice()

        this.localService.getLocalById(this.localId).subscribe((local) => {
            this.localName = local.name
        })

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

    formatRentDateTime(): void {
        this.formattedRentDateTime = format(
            new Date(this.rentDateTime),
            'dd/MM/yyyy HH:mm'
        )
    }

    sendOffer(): void {
        this.formatRentDateTime()
        Swal.fire({
            title: 'Send Offer',
            text:
                'Are you sure you want to send offer for ' +
                this.localName +
                ' at ' +
                this.formattedRentDateTime +
                ' appointment for the price ' +
                this.price +
                '$?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Offer Sent',
                    'The offer has been sent successfully!',
                    'success'
                )

                const formattedDateTime = new Date(
                    this.rentDateTime
                ).toISOString()

                const data = {
                    userId: this.userId,
                    localId: this.localId,
                    price: this.price,
                    dateTime: formattedDateTime,
                    rentOfferStatus: 'SENT',
                }

                this.rentOfferService.createRentOffer(data).subscribe(
                    (response) => {
                        console.log(response)
                    },
                    (error) => {
                        console.error('Error sending offer:', error)
                    }
                )
            } else {
                Swal.fire('Cancelled', 'The offer has not been sent.', 'info')
            }
        })
    }
}
