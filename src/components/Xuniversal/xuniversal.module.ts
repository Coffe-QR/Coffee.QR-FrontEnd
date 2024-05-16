import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { SupplyStatusComponent } from './supply-status/supply-status.component'
import { SupplyDetailsComponent } from './supply-details/supply-details.component'
import { MenuOverviewComponent } from './menu-overview/menu-overview.component'
import { JobApplicationFormComponent } from './job-application-form/job-application-form.component'
import { AllEventsOverviewComponent } from './all-events-overview/all-events-overview.component'
import { RouterModule } from '@angular/router'

@NgModule({
    declarations: [
        SupplyStatusComponent,
        SupplyDetailsComponent,
        MenuOverviewComponent,
        JobApplicationFormComponent,
        AllEventsOverviewComponent,
    ],
    imports: [CommonModule, FormsModule, RouterModule],
    exports: [
        SupplyStatusComponent,
        SupplyDetailsComponent,
        AllEventsOverviewComponent,
    ],
})
export class XUniversalModule {}
