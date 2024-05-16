import { Component, OnInit } from '@angular/core'
import { AuthService } from '../../../auth/auth.service'
import { User } from '../../../auth/model/user.model'
import { TableService } from '../../Xuniversal/table.service'
import { Router } from '@angular/router'
import { LocalUserService } from '../../Xuniversal/local-user.service'
import { FormControl, Validators } from '@angular/forms'

@Component({
    selector: 'app-create-table',
    templateUrl: './create-table.component.html',
    styleUrl: './create-table.component.scss',
})
export class CreateTableComponent implements OnInit {
    user: User | undefined
    userId: number = 0

    submitAttempted = false

    // Add table properties
    tableName: string = ''
    tableCapacity: number = 0
    tableIsSmokingArea: boolean = false
    tableLocalId: number = 0

    constructor(
        private authService: AuthService,
        private tableService: TableService,
        private localuserService: LocalUserService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.authService.user$.subscribe((user) => {
            this.user = user
        })
        this.userId = this.authService.user$.getValue().id

        this.localuserService.getLocalUserByUserId(this.userId).subscribe({
            next: (response) => {
                this.tableLocalId = response.localId
            },
            error: (error) => console.error('Error getting local user:', error),
        })
    }

    onSubmit(): void {
        const tableData = {
            name: this.tableName,
            capacity: this.tableCapacity,
            isSmokingArea: this.tableIsSmokingArea,
            localId: this.tableLocalId,
        }

        this.submitAttempted = true
        if (this.tableCapacity <= 0) {
            return
        }

        this.tableService.createTable(tableData).subscribe({
            next: (response) => this.router.navigate(['/manager']),
            error: (error) => console.error('Error creating table:', error),
        })
    }
}
