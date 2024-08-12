import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { TicketsOverviewComponent } from './tickets-overview/tickets-overview.component';
import { LocalsOverviewComponent } from './locals-overview/locals-overview.component'

@NgModule({
    declarations: [TicketsOverviewComponent, LocalsOverviewComponent],
    imports: [CommonModule],
    exports: [TicketsOverviewComponent],
})
export class ClientModule {}
