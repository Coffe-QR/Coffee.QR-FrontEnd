import { Component } from '@angular/core'
import { EventManagerConfigOptions } from '@seatsio/seatsio-types'
import { EmbeddableProps } from '@seatsio/seatsio-angular'

@Component({
    selector: 'app-create-event-seat-map',
    templateUrl: './create-event-seat-map.component.html',
    styleUrl: './create-event-seat-map.component.scss',
})
export class CreateEventSeatMapComponent {
    eventManagerConfig: EmbeddableProps<EventManagerConfigOptions> = {
        region: 'eu',
        secretKey: '709f52bc-9892-4334-b511-99fe2a56646a',
        event: 'SAX-p1',
        mode: 'manageObjectStatuses',
    }
}
