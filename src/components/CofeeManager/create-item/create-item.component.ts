import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { Router } from '@angular/router'
import { ItemService } from '../item.service'
import { UploadService } from '../../../shared/upload.service'
import { ToastrService } from 'ngx-toastr'
import { NgForm } from '@angular/forms'

@Component({
    selector: 'app-create-item',
    templateUrl: './create-item.component.html',
    styleUrls: ['./create-item.component.scss'],
})
export class CreateItemComponent implements OnInit {
    @ViewChild('createItemForm') createItemForm!: NgForm // Reference the form
    @ViewChild('fileInput') fileInput!: ElementRef // Reference the file input

    submitAttempted = false
    // Properties
    itemName: string = ''
    itemDescription: string = ''
    itemPrice: number = 0
    itemPicture: string = ''

    constructor(
        private uploadService: UploadService,
        private itemService: ItemService,
        private router: Router,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {}

    onSubmit(): void {
        const itemData = {
            name: this.itemName,
            description: this.itemDescription,
            price: this.itemPrice,
            picture: this.itemPicture,
        }

        this.submitAttempted = true

        if (this.itemPrice <= 0) {
            return
        }

        this.itemService.createItem(itemData).subscribe({
            next: (response) => {
                this.toastr.success('Item created successfully', 'Success')
                this.submitAttempted = false

                // Reset the form
                this.createItemForm.resetForm()

                // Manually reset the file input
                if (this.fileInput) {
                    this.fileInput.nativeElement.value = '' // Clear the file input field
                }
            },
            error: (error) => {
                console.error('Error creating item:', error)
                this.submitAttempted = false
            },
        })
    }

    onFileSelected(event: any): void {
        const file: File = event.target.files[0]

        if (file) {
            this.uploadService.uploadImage(file).subscribe({
                next: (response) => {
                    this.itemPicture = response.path
                },
                error: (error) => {
                    console.error('Error uploading image:', error)
                },
            })
        }
    }
}
