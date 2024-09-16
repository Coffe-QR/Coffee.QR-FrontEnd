import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CreateEventComponent } from './create-event/create-event.component'
import { ManagerLandingPageComponent } from './manager-landing-page/manager-landing-page.component'
import { FormsModule } from '@angular/forms'
import { SupplyCreateComponent } from './supply-create/supply-create.component'
import { EventsOverviewComponent } from './events-overview/events-overview.component'
import { FilterPipe } from '../../shared/filter-pipe'
import { CreateTableComponent } from './create-table/create-table.component'
import { CreateTicketComponent } from './create-ticket/create-ticket.component'
import { MatDialogModule } from '@angular/material/dialog'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { EventDescriptionDialogComponent } from './event-description-dialog/event-description-dialog.component'
import { CreateMenuComponent } from './create-menu/create-menu.component'
import { MenuDetailsComponent } from './menu-details/menu-details.component'
import { CreateItemComponent } from './create-item/create-item.component' // Needed for animations
import { JobsOverviewComponent } from './jobs-overview/jobs-overview.component'
import { TicketSaleReportComponent } from './ticket-sale-report/ticket-sale-report.component'
import { RegionsOverviewComponent } from './regions-overview/regions-overview.component'
import { RegionItemsComponent } from './region-items/region-items.component'
import { SharedModule } from '../../shared/shared.module'

@NgModule({
    declarations: [
        CreateEventComponent,
        ManagerLandingPageComponent,
        SupplyCreateComponent,
        EventsOverviewComponent,
        CreateTableComponent,
        CreateTicketComponent,
        EventDescriptionDialogComponent,
        CreateMenuComponent,
        MenuDetailsComponent,
        CreateItemComponent,
        JobsOverviewComponent,
        TicketSaleReportComponent,
        RegionsOverviewComponent,
        RegionItemsComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatDialogModule,
        BrowserAnimationsModule,
        SharedModule,
    ],
    exports: [
        CreateEventComponent,
        ManagerLandingPageComponent,
        SupplyCreateComponent,
        CreateItemComponent,
    ],
})
export class ManagerModule {}
