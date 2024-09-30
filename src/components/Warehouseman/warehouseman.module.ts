import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { WarehousemanLandingPageComponent } from './warehouseman-landing-page/warehouseman-landing-page.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { CreateErrorComponent } from './create-error/create-error.component'

@NgModule({
    declarations: [WarehousemanLandingPageComponent, WarehouseComponent, CreateErrorComponent],
    imports: [CommonModule, FormsModule],
    exports: [WarehousemanLandingPageComponent],
})
export class WarehousemanModule {}
