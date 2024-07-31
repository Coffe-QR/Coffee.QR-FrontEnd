import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CreateEventComponent } from './create-event/create-event.component'
import { ManagerLandingPageComponent } from './manager-landing-page/manager-landing-page.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
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
import { SeatsioAngularModule } from '@seatsio/seatsio-angular'
import { CategoriesInfoDialogComponent } from './manage-event-tickets/categories-info-dialog/categories-info-dialog.component'
import { ManageEventTicketsComponent } from './manage-event-tickets/manage-event-tickets.component'
import { CreateTicketForEventComponent } from './create-ticket-for-event/create-ticket-for-event.component'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'

@NgModule({
    declarations: [
        CreateEventComponent,
        ManagerLandingPageComponent,
        SupplyCreateComponent,
        EventsOverviewComponent,
        FilterPipe,
        CreateTableComponent,
        CreateTicketComponent,
        EventDescriptionDialogComponent,
        CreateMenuComponent,
        MenuDetailsComponent,
        CreateItemComponent,
        JobsOverviewComponent,
        TicketSaleReportComponent,
        CategoriesInfoDialogComponent,
        ManageEventTicketsComponent,
        CreateTicketForEventComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatDialogModule,
        BrowserAnimationsModule,
        SeatsioAngularModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
    ],
    exports: [
        CreateEventComponent,
        ManagerLandingPageComponent,
        SupplyCreateComponent,
        CreateItemComponent,
    ],
})
export class ManagerModule {}
