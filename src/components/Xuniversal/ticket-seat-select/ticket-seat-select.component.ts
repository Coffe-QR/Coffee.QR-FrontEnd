import { Component, OnInit } from '@angular/core'
import { ChartRendererConfigOptions } from '@seatsio/seatsio-types'
import { EmbeddableProps } from '@seatsio/seatsio-angular'

@Component({
    selector: 'app-ticket-seat-select',
    templateUrl: './ticket-seat-select.component.html',
    styleUrls: ['./ticket-seat-select.component.scss'],
})
export class TicketSeatSelectComponent implements OnInit {
    config: EmbeddableProps<ChartRendererConfigOptions> = {
        region: 'eu',
        workspaceKey: '2d3804d9-bcc2-44cd-b613-b2e5afb398cb',
        event: 'SAX-p1',
        pricing: [
            { category: 'Stolovi', price: 100 },
            { category: 'Separei', price: 250 },
        ],
    }

    constructor() {}

    ngOnInit(): void {}
}
