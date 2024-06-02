import { Component, OnInit } from '@angular/core'
import { JobsReportService } from '../jobs-report.service'
import { ActivatedRoute } from '@angular/router'
import { LocalUserService } from '../../Xuniversal/local-user.service'
import { JobsReport } from '../../../auth/model/jobs-report.model'

@Component({
    selector: 'app-jobs-report',
    templateUrl: './jobs-report.component.html',
    styleUrls: ['./jobs-report.component.scss'],
})
export class JobsReportComponent implements OnInit {
    filteredReports: JobsReport[] = []
    repots: JobsReport[] = []

    constructor(private reportService: JobsReportService) {}

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
