import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { WarehousemanLandingPageComponent } from './warehouseman-landing-page/warehouseman-landing-page.component'

@NgModule({
    declarations: [WarehousemanLandingPageComponent],
    imports: [CommonModule, FormsModule],
    exports: [WarehousemanLandingPageComponent],
})
export class WarehousemanModule {}
