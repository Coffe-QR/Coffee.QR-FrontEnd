import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { ItSupportLandingPageComponent } from './it-support-landing-page/it-support-landing-page.component'
import { CreateLocalComponent } from './create-local/create-local.component'

@NgModule({
    declarations: [ItSupportLandingPageComponent, CreateLocalComponent],
    imports: [CommonModule, FormsModule],
    exports: [ItSupportLandingPageComponent, CreateLocalComponent],
})
export class ITSupportModule {}
