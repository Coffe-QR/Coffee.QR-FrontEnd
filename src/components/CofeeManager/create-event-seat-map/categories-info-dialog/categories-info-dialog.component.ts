import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
    selector: 'app-categories-info-dialog',
    templateUrl: './categories-info-dialog.component.html',
    styleUrls: ['./categories-info-dialog.component.scss'],
})
export class CategoriesInfoDialogComponent {
    constructor(@Inject(MAT_DIALOG_DATA) public data: { categories: any }) {
        console.log('Categories otvoreno:', this.data.categories)
    }
}
