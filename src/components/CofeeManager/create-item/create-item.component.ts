import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ItemService } from '../item.service'
import { UploadService } from '../../../shared/upload.service'

@Component({
    selector: 'app-create-item',
    templateUrl: './create-item.component.html',
    styleUrls: ['./create-item.component.scss'],
})
export class CreateItemComponent implements OnInit {
    submitAttempted = false
    //properties
    itemName: string = ''
    itemType: any
    itemDescription: string = ''
    itemPrice: number = 0
    itemPicture: string = ''

    constructor(
        private uploadService: UploadService,
        private itemService: ItemService,
        private router: Router
    ) {}

    ngOnInit(): void {}

    onSubmit(): void {
        const itemData = {
            name: this.itemName,
            type: Number(this.itemType),
            description: this.itemDescription,
            price: this.itemPrice,
            picture: this.itemPicture,
        }

        alert(this.itemType)

        this.submitAttempted = true
        if (this.itemPrice <= 0) {
            return
        }

        this.itemService.createItem(itemData).subscribe({
            next: (response) => {
                alert('Item created successfully')
                this.router.navigate(['/manager'])
            },
            error: (error) => console.error('Error creating item:', error),
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
