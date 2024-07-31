import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { Component, Inject } from '@angular/core'
import { FormGroup, FormControl } from '@angular/forms'
import { TicketService } from '../../../Xuniversal/ticket.service'

@Component({
    selector: 'app-categories-info-dialog',
    templateUrl: './categories-info-dialog.component.html',
})
export class CategoriesInfoDialogComponent {
    categoryForm: FormGroup

    constructor(
        public dialogRef: MatDialogRef<CategoriesInfoDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private ticketService: TicketService
    ) {
        this.categoryForm = new FormGroup({
            type: new FormControl(this.data.category.type),
            note: new FormControl(this.data.category.note),
            price: new FormControl(this.data.category.price),
        })
        console.log(this.data.category)
    }

    onSave(): void {
        const updatedCategory = this.categoryForm.value
        // Call the service to update the category, using data from the form

        this.ticketService
            .updateCard(this.data.category.categoryId, this.categoryForm.value)
            .subscribe({
                next: (response) => {
                    console.log('Update successful', response)
                    this.dialogRef.close()
                },
                error: (error) => {
                    console.error('Error updating category', error)
                },
            })

        // Assuming you have a service method to update
        this.dialogRef.close(updatedCategory)
    }
}
