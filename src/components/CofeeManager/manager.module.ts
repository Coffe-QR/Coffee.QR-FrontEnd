import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CreateEventComponent } from './create-event/create-event.component'
import { ManagerLandingPageComponent } from './manager-landing-page/manager-landing-page.component'
import { FormsModule } from '@angular/forms'
import { SupplyCreateComponent } from './supply-create/supply-create.component'
import { EventsOverviewComponent } from './events-overview/events-overview.component'
import { FilterPipe } from '../../shared/filter-pipe'
import { CreateTableComponent } from './create-table/create-table.component'
import { ReportListComponent } from './report-list/report-list.component'

@NgModule({
    declarations: [
        CreateEventComponent,
        ManagerLandingPageComponent,
        SupplyCreateComponent,
        EventsOverviewComponent,
        FilterPipe,
        CreateTableComponent,
        ReportListComponent,
    ],
    imports: [CommonModule, FormsModule],
    exports: [
        CreateEventComponent,
        ManagerLandingPageComponent,
        SupplyCreateComponent,
        ReportListComponent,
    ],
})
export class ManagerModule {}
