import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { LocalService } from '../../Xuniversal/local.service'

@Component({
    selector: 'app-manage-locals',
    templateUrl: './manage-locals.component.html',
    styleUrls: ['./manage-locals.component.scss'],
})
export class ManageLocalsComponent implements OnInit {
    locals: any[] = []
    filteredLocals: any[] = []
    searchTerm: string = ''
    sortDirection: { [key: string]: boolean } = {}
    sortColumn: string = ''

    constructor(
        private router: Router,
        private localService: LocalService
    ) {}

    ngOnInit(): void {
        this.localService.getAllLocals().subscribe((data) => {
            this.locals = data
            this.filteredLocals = data
        })
    }

    manageLocal(localId: number): void {
        this.router.navigate(['/update-local-seat-map/', localId])
    }

    filterLocals(): void {
        if (this.searchTerm) {
            this.filteredLocals = this.locals.filter((local) =>
                local.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            )
        } else {
            this.filteredLocals = this.locals
        }
    }

    sortTable(column: string): void {
        if (this.sortColumn === column) {
            this.sortDirection[column] = !this.sortDirection[column]
        } else {
            this.sortColumn = column
            this.sortDirection[column] = true
        }

        const direction = this.sortDirection[column]
        this.filteredLocals.sort((a, b) => {
            if (a[column] < b[column]) {
                return direction ? -1 : 1
            } else if (a[column] > b[column]) {
                return direction ? 1 : -1
            } else {
                return 0
            }
        })
    }
}
