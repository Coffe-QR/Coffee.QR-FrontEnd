import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { SupplyStatusComponent } from './supply-status/supply-status.component'
import { SupplyDetailsComponent } from './supply-details/supply-details.component';
import { MenuOverviewComponent } from './menu-overview/menu-overview.component'
import { JobApplicationFormComponent } from './job-application-form/job-application-form.component';

@NgModule({
    declarations: [SupplyStatusComponent, SupplyDetailsComponent, MenuOverviewComponent, JobApplicationFormComponent],
    imports: [CommonModule, FormsModule],
    exports: [SupplyStatusComponent, SupplyDetailsComponent],
})
export class XUniversalModule {}
