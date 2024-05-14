import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { WaiterLandingPageComponent } from './waiter-landing-page/waiter-landing-page.component'
import { FormsModule } from '@angular/forms'
import { NotificationOverviewComponent } from './notification-overview/notification-overview.component'

@NgModule({
    declarations: [WaiterLandingPageComponent, NotificationOverviewComponent],
    imports: [CommonModule, FormsModule],
    exports: [WaiterLandingPageComponent, NotificationOverviewComponent],
})
export class WaiterModule {}
