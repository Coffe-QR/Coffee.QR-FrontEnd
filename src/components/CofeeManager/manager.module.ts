import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CreateEventComponent } from './create-event/create-event.component'
import { ManagerLandingPageComponent } from './manager-landing-page/manager-landing-page.component'
import { FormsModule } from '@angular/forms'

@NgModule({
    declarations: [CreateEventComponent, ManagerLandingPageComponent],
    imports: [CommonModule, FormsModule],
    exports: [CreateEventComponent, ManagerLandingPageComponent],
})
export class ManagerModule {}
