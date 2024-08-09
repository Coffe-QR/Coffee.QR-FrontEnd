import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TicketsOverviewComponent } from './tickets-overview/tickets-overview.component'

@NgModule({
    declarations: [TicketsOverviewComponent],
    imports: [CommonModule],
    exports: [TicketsOverviewComponent],
})
export class ClientModule {}
