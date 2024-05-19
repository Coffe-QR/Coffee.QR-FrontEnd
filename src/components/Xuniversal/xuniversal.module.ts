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
import { StorageComponent } from './storage/storage.component'

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
        StorageComponent,
    ],
    imports: [CommonModule, FormsModule, RouterModule],
    exports: [
        SupplyStatusComponent,
        SupplyDetailsComponent,
        AllEventsOverviewComponent,
        TicketsSelectComponent,
        StorageComponent,
    ],
})
export class XUniversalModule {}
