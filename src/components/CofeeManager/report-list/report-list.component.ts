import { Component } from '@angular/core'
import { Report } from '../../../auth/model/report.model'
import { ReportService } from '../report.service'

@Component({
    selector: 'app-report-list',
    templateUrl: './report-list.component.html',
    styleUrl: './report-list.component.scss',
})
export class ReportListComponent {
    filteredReports: Report[] = []
    repots: Report[] = []

    constructor(private reportService: ReportService) {}

    ngOnInit() {
        this.reportService.getAllForLocal(1).subscribe({
            next: (response) => {
                this.filteredReports = response
                this.repots = response
            },
            error: (error) => console.error('Error creating event:', error),
        })
    }
}
