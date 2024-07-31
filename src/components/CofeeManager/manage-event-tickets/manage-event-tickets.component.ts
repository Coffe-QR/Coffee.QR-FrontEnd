import { Component, OnInit } from '@angular/core'
import { EventManagerConfigOptions } from '@seatsio/seatsio-types'
import { EmbeddableProps } from '@seatsio/seatsio-angular'
import { EventService } from '../event.service'
import { ActivatedRoute, Router } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { CategoriesInfoDialogComponent } from './categories-info-dialog/categories-info-dialog.component'
import { TicketService } from '../../Xuniversal/ticket.service'
import { TicketEventService } from '../../Xuniversal/ticket-event.service'
import { SeatsioService } from '../../Xuniversal/seatsio.service'
import { ToastrService } from 'ngx-toastr'

@Component({
    selector: 'app-manage-event-tickets',
    templateUrl: './manage-event-tickets.component.html',
    styleUrls: ['./manage-event-tickets.component.scss'],
})
export class ManageEventTicketsComponent implements OnInit {
    eventId: number = 0
    categories: any[] = []
    cat1: any[] = []
    eventName: string = ''
    sanitizedEventName: string = ''
    labels: string[] = []

    selectedCategory: any = null
    selectedObjects: any[] = []

    eventManagerConfig: EmbeddableProps<EventManagerConfigOptions> = {
        region: 'eu',
        secretKey: '709f52bc-9892-4334-b511-99fe2a56646a',
        event: '',
        mode: 'select',

        extraConfig: {},
        onObjectSelected: (selectedObject) => {
            this.selectedObjects.push(selectedObject)
        },
        onObjectDeselected: (deselectedObject) => {
            this.selectedObjects = this.selectedObjects.filter(
                (obj) => obj.label !== deselectedObject.label
            )
        },
    }

    constructor(
        private eventService: EventService,
        private route: ActivatedRoute,
        private dialog: MatDialog,
        private ticketService: TicketService,
        private ticketEventService: TicketEventService,
        private seatsioService: SeatsioService,
        private toastr: ToastrService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.eventId = this.route.snapshot.params['eventId']

        this.eventService.getEventById(this.eventId).subscribe({
            next: (event) => {
                this.eventName = event.name
                this.sanitizedEventName = this.sanitizeEventKey(event.name)
                this.eventManagerConfig.event = this.sanitizeEventKey(
                    event.name
                )
            },
            error: (err) => console.error('Failed to load event:', err),
        })

        this.ticketEventService.getAllByEventId(this.eventId).subscribe({
            next: (tickets) => {
                this.categories = tickets
                this.categories.forEach((category) => {
                    this.ticketService.getById(category.cardId).subscribe({
                        next: (ticket) => {
                            this.cat1.push({
                                id: category.id,
                                categoryId: category.cardId,
                                type: ticket.type,
                                price: category.price,
                                note: ticket.note,
                            })
                        },
                        error: (err) =>
                            console.error('Failed to load ticket:', err),
                    })
                })
            },
            error: (err) => console.error('Failed to load tickets:', err),
        })
    }

    sanitizeEventKey(key: string): string {
        return key.replace(/[^a-zA-Z0-9-]/g, '-')
    }

    onSelectedCategory(category: any): void {
        if (this.selectedObjects.length === 0) {
            this.toastr.info('Please select a objects first!')
        } else {
            this.selectedCategory = category.type
            this.labels = this.selectedObjects.map((obj) => obj.label)
            this.seatsioService
                .updateCategory(
                    this.sanitizedEventName,
                    this.labels,
                    this.selectedCategory
                )
                .subscribe({
                    next: () => {
                        this.toastr.success('Category updated!', 'Success!')
                        window.location.reload()
                    },
                    error: (err) => {
                        console.error('Failed to update category:', err)
                        this.toastr.error('Failed to update category.')
                    },
                })
        }
    }

    onEditCategory(category: any): void {
        //PROSLEDJUJEM ID CARDEVENTA UMESTO CARDID
        const dialogRef = this.dialog.open(CategoriesInfoDialogComponent, {
            width: '250px',
            data: { category: category },
        })

        dialogRef.afterClosed().subscribe((result) => {
            console.log('The dialog was closed')
            // Optionally refresh the categories list here
        })
    }
    onAddNewCategory(): void {
        this.router.navigate(['create-ticket-for-event/', this.eventId])
    }

    onShowCategoriesInfo(): void {
        // if (this.selectedObjects.length === 0) {
        //     this.toastr.info('Please select a objects first!')
        // } else {
        //     const dialogRef = this.dialog.open(CategoriesInfoDialogComponent, {
        //         panelClass: 'custom-dialog',
        //         data: { categories: this.cat1 },
        //     })
        //     this.labels = this.selectedObjects.map((obj) => obj.label)
        //     dialogRef.afterClosed().subscribe((result) => {
        //         if (result) {
        //             this.selectedCategory = result.type // Ensure it's a string
        //             // Log to verify data
        //             console.log('Event Name:', this.sanitizedEventName)
        //             console.log('Labels:', this.labels)
        //             console.log('Selected Category:', this.selectedCategory)
        // this.seatsioService
        //     .updateCategory(
        //         this.sanitizedEventName,
        //         this.labels,
        //         this.selectedCategory
        //     )
        //     .subscribe({
        //         next: (res) => {
        //             // Assuming toastr.success() is the method you're calling to show the notification
        //             this.toastr.success(
        //                 'Category updated!',
        //                 'Success!',
        //                 { timeOut: 400 }
        //             ) // Adjust timeOut as needed
        //             setTimeout(() => {
        //                 window.location.reload()
        //             }, 400) // Set this slightly longer than the toastr timeOut
        //         },
        //         error: (err) => {
        //             console.error('Failed to update category:', err)
        //             this.toastr.error('Failed to update category.')
        //         },
        //     })
        //         }
        //     })
        // }
    }
}
