import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { WarehousemanLandingPageComponent } from './warehouseman-landing-page/warehouseman-landing-page.component';
import { WarehouseComponent } from './warehouse/warehouse.component'

@NgModule({
    declarations: [WarehousemanLandingPageComponent, WarehouseComponent],
    imports: [CommonModule, FormsModule],
    exports: [WarehousemanLandingPageComponent],
})
export class WarehousemanModule {}
