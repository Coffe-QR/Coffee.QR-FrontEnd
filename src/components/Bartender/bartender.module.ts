import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { FormsModule } from '@angular/forms'
import { BartenderLandingPageComponent } from './bartender-landing-page/bartender-landing-page.component';
import { NotificationOverviewBartenderComponent } from './notification-overview-bartender/notification-overview-bartender.component'

@NgModule({
    declarations: [BartenderLandingPageComponent, NotificationOverviewBartenderComponent],
    imports: [CommonModule, FormsModule],
    exports: [BartenderLandingPageComponent],
})
export class BartenderModule {}
