import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { WaiterLandingPageComponent } from './waiter-landing-page/waiter-landing-page.component'
import { FormsModule } from '@angular/forms'
import { NotificationOverviewComponent } from './notification-overview/notification-overview.component';
import { OrderDetailsComponent } from './order-details/order-details.component'

@NgModule({
    declarations: [WaiterLandingPageComponent, NotificationOverviewComponent, OrderDetailsComponent],
    imports: [CommonModule, FormsModule],
    exports: [WaiterLandingPageComponent, NotificationOverviewComponent],
})
export class WaiterModule {}
