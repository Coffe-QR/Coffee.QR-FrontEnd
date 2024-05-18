import { Component, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
    selector: 'app-event-description-dialog',
    templateUrl: './event-description-dialog.component.html',
    styleUrls: ['./event-description-dialog.component.scss'],
})
export class EventDescriptionDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { description: string }
    ) {}
}
