import { Component, OnInit } from '@angular/core'
import { NotificationService } from '../notification.service'
import { ActivatedRoute } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { TableService } from '../table.service'

@Component({
    selector: 'app-menu-overview',
    templateUrl: './menu-overview.component.html',
    styleUrl: './menu-overview.component.scss',
})
export class MenuOverviewComponent implements OnInit {
    localId: number = 0
    tableId: number = 0
    tableName: string = ''

    constructor(
        private notificationService: NotificationService,
        private tableService: TableService,
        private route: ActivatedRoute,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        const localIdParam = this.route.snapshot.paramMap.get('localId')
        const tableIdParam = this.route.snapshot.paramMap.get('tableId')

        this.localId = localIdParam ? +localIdParam : 0
        this.tableId = tableIdParam ? +tableIdParam : 0

        this.tableService.getTableById(this.tableId).subscribe({
            next: (data) => {
                this.tableName = data.name
            },
        })
    }

    callWaiter() {
        const notificationData = {
            message: this.tableName + ' asked to come',
            dateTime: new Date().toISOString(),
            isActive: true,
            tableId: this.tableId,
            localId: this.localId,
        }

        this.notificationService
            .createNotification(notificationData)
            .subscribe({
                next: (data) =>
                    this.toastr.success('Waiter called successfully!'),
                error: (error) => console.error('GREDA:', error),
            })
    }

    askForTheBill() {
        const notificationData = {
            message: this.tableName + ' asked for a bill',
            dateTime: new Date().toISOString(),
            isActive: true,
            tableId: this.tableId,
            localId: this.localId,
        }

        this.notificationService
            .createNotification(notificationData)
            .subscribe({
                next: (data) =>
                    this.toastr.success('Bill requsted successfully!'),
                error: (error) => console.error('GREDA:', error),
            })
    }
}
