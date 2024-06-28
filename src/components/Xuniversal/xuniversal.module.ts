import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { SupplyStatusComponent } from './supply-status/supply-status.component'
import { SupplyDetailsComponent } from './supply-details/supply-details.component'
import { MenuOverviewComponent } from './menu-overview/menu-overview.component'
import { JobApplicationFormComponent } from './job-application-form/job-application-form.component'
import { AllEventsOverviewComponent } from './all-events-overview/all-events-overview.component'
import { RouterModule } from '@angular/router'
import { TicketsSelectComponent } from './tickets-select/tickets-select.component'
import { PaymentComponent } from './payment/payment.component'
import { PaymentCompletedComponent } from './payment-completed/payment-completed.component'
import { GoogleFormComponent } from './google-form/google-form.component'
import { TicketSeatSelectComponent } from './ticket-seat-select/ticket-seat-select.component'
import { SeatsioAngularModule } from '@seatsio/seatsio-angular'

@NgModule({
    declarations: [
        SupplyStatusComponent,
        SupplyDetailsComponent,
        MenuOverviewComponent,
        JobApplicationFormComponent,
        AllEventsOverviewComponent,
        TicketsSelectComponent,
        PaymentComponent,
        PaymentCompletedComponent,
        GoogleFormComponent,
        TicketSeatSelectComponent,
    ],
    imports: [CommonModule, FormsModule, RouterModule, SeatsioAngularModule],
    exports: [
        SupplyStatusComponent,
        SupplyDetailsComponent,
        AllEventsOverviewComponent,
        TicketsSelectComponent,
    ],
})
export class XUniversalModule {}
