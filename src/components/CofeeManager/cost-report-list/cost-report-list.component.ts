import { Component } from '@angular/core'
import { ReportService } from '../report.service'
import { Report } from '../../../auth/model/report.model'

@Component({
    selector: 'app-cost-report-list',
    templateUrl: './cost-report-list.component.html',
    styleUrl: './cost-report-list.component.scss',
})
export class CostReportListComponent {
    filteredReports: Report[] = []
    repots: Report[] = []

    constructor(private reportService: ReportService) {}

    ngOnInit() {
        this.reportService.getAllCostForLocal(1).subscribe({
            next: (response) => {
                this.filteredReports = response
                this.repots = response
            },
            error: (error) => console.error('Error creating event:', error),
        })
    }

    getType(type: number) {
        if (type == 0) return 'Monthly'
        else return 'Yearly'
    }
}
