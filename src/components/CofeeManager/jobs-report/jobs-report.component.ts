import { Component } from '@angular/core'
import { JobReportService } from '../jobs-report.service'
import { JobsReport } from '../../../auth/model/jobs-report.model'

@Component({
    selector: 'app-jobs-report',
    templateUrl: './jobs-report.component.html',
    styleUrl: './jobs-report.component.scss',
})
export class JobsReportComponent {
    filteredReports: JobsReport[] = []
    repots: JobsReport[] = []

    constructor(private reportService: JobReportService) {}

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
