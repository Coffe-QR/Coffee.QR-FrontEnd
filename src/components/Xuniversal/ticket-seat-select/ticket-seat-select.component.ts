import { Component, OnInit } from '@angular/core'
import { ChartRendererConfigOptions } from '@seatsio/seatsio-types'
import { EmbeddableProps } from '@seatsio/seatsio-angular'
import { ActivatedRoute, Router } from '@angular/router' // Import the Router class
import { EventService } from '../../CofeeManager/event.service'

@Component({
    selector: 'app-ticket-seat-select',
    templateUrl: './ticket-seat-select.component.html',
    styleUrls: ['./ticket-seat-select.component.scss'],
})
export class TicketSeatSelectComponent implements OnInit {
    eventId: number = 0
    eventName: string = ''
    totalpr: number = 0

    config: EmbeddableProps<ChartRendererConfigOptions> & { totalpr: number } =
        {
            region: 'eu',
            workspaceKey: '2d3804d9-bcc2-44cd-b613-b2e5afb398cb',
            event: 'SAX-p1', //this.eventName,

            pricing: [
                { category: 'Stolovi', price: 100 },
                { category: 'Separei', price: 250 },
            ],
            priceFormatter: (price) => '$' + price,
            onObjectSelected: (object) => {
                console.log(object.pricing.price)
                this.totalpr += Number(object.pricing.price)
            },

            onChartRendered(chart) {
                chart.changeConfig({
                    filteredCategories: ['Stolovi', 'Separei'],
                })
                chart.zoomToFilteredCategories()
            },
            totalpr: this.totalpr,
        }
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private eventService: EventService
    ) {}

    onContinueToPayment(): void {
        alert('Total price: ' + this.totalpr)
        this.router.navigate(['/payment'])
    }

    ngOnInit(): void {
        this.eventId = this.route.snapshot.params['eventId']

        this.eventService.getEventById(this.eventId).subscribe((event) => {
            this.eventName = event.name
        })
    }
}
