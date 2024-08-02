import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ItSupportLandingPageComponent } from './it-support-landing-page/it-support-landing-page.component'
import { CreateLocalComponent } from './create-local/create-local.component'
import { CreateLocalSeatMapComponent } from './create-local-seat-map/create-local-seat-map.component'
import { SeatsioAngularModule } from '@seatsio/seatsio-angular';
import { ManageLocalsComponent } from './manage-locals/manage-locals.component';
import { UpdateLocalSeatMapComponent } from './update-local-seat-map/update-local-seat-map.component'

@NgModule({
    declarations: [
        ItSupportLandingPageComponent,
        CreateLocalComponent,
        CreateLocalSeatMapComponent,
        ManageLocalsComponent,
        UpdateLocalSeatMapComponent,
    ],
    imports: [CommonModule, FormsModule, SeatsioAngularModule],
    exports: [ItSupportLandingPageComponent, CreateLocalComponent],
})
export class ITSupportModule {}
