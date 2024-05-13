import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { SupplyStatusComponent } from './supply-status/supply-status.component'
import { SupplyDetailsComponent } from './supply-details/supply-details.component'

@NgModule({
    declarations: [SupplyStatusComponent, SupplyDetailsComponent],
    imports: [CommonModule, FormsModule],
    exports: [SupplyStatusComponent, SupplyDetailsComponent],
})
export class XUniversalModule {}
