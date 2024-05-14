import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CreateEventComponent } from './create-event/create-event.component'
import { ManagerLandingPageComponent } from './manager-landing-page/manager-landing-page.component'
import { FormsModule } from '@angular/forms'
import { SupplyCreateComponent } from './supply-create/supply-create.component'
import { EventsOverviewComponent } from './events-overview/events-overview.component'
import { FilterPipe } from '../../shared/filter-pipe'

@NgModule({
    declarations: [
        CreateEventComponent,
        ManagerLandingPageComponent,
        SupplyCreateComponent,
        EventsOverviewComponent,
        FilterPipe,
    ],
    imports: [CommonModule, FormsModule],
    exports: [
        CreateEventComponent,
        ManagerLandingPageComponent,
        SupplyCreateComponent,
    ],
})
export class ManagerModule {}
