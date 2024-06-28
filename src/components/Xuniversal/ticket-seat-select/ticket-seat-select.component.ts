import { Component, OnInit } from '@angular/core'
import { ChartRendererConfigOptions } from '@seatsio/seatsio-types'
import { EmbeddableProps } from '@seatsio/seatsio-angular'
import { Router } from '@angular/router' // Import the Router class

@Component({
    selector: 'app-ticket-seat-select',
    templateUrl: './ticket-seat-select.component.html',
    styleUrls: ['./ticket-seat-select.component.scss'],
})
export class TicketSeatSelectComponent implements OnInit {
    totalpr: number = 0

    config: EmbeddableProps<ChartRendererConfigOptions> & { totalpr: number } =
        {
            region: 'eu',
            workspaceKey: '2d3804d9-bcc2-44cd-b613-b2e5afb398cb',
            event: 'SAX-p1',
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
    constructor(private router: Router) {}

    onContinueToPayment(): void {
        alert('Total price: ' + this.totalpr)
        this.router.navigate(['/payment'])
    }

    ngOnInit(): void {}
}
