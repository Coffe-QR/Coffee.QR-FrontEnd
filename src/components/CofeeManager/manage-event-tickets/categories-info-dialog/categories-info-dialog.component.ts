import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
    selector: 'app-categories-info-dialog',
    templateUrl: './categories-info-dialog.component.html',
    styleUrls: ['./categories-info-dialog.component.scss'],
})
export class CategoriesInfoDialogComponent {
    selectedCategoryIndex: number | null = null

    constructor(
        public dialogRef: MatDialogRef<CategoriesInfoDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { categories: any[] }
    ) {}

    toggleSelection(index: number): void {
        if (this.selectedCategoryIndex === index) {
            this.selectedCategoryIndex = null
            this.dialogRef.close(null)
        } else {
            this.selectedCategoryIndex = index
            this.dialogRef.close(this.data.categories[index])
        }
    }
}
