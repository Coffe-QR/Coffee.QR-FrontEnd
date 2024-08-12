import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TicketsOverviewComponent } from './tickets-overview/tickets-overview.component'
import { LocalsOverviewComponent } from './locals-overview/locals-overview.component'
import { RentOfferComponent } from './rent-offer/rent-offer.component'
import { RouterModule } from '@angular/router'
import { SeatsioAngularModule } from '@seatsio/seatsio-angular'
import { FormsModule } from '@angular/forms'

@NgModule({
    declarations: [
        TicketsOverviewComponent,
        LocalsOverviewComponent,
        RentOfferComponent,
    ],
    imports: [CommonModule, RouterModule, SeatsioAngularModule, FormsModule],
    exports: [TicketsOverviewComponent, RentOfferComponent],
})
export class ClientModule {}
