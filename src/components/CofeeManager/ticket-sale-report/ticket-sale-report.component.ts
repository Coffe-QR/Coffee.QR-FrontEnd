import { Component } from '@angular/core'
import { TicketSaleReportService } from '../ticket-sale-report-service'
import { AuthService } from '../../../auth/auth.service'
import { User } from '../../../auth/model/user.model'

interface Report {
    id: string
    type: string
    date: string
    path: string
}

@Component({
    selector: 'app-ticket-sale-report',
    templateUrl: './ticket-sale-report.component.html',
    styleUrl: './ticket-sale-report.component.scss',
})
export class TicketSaleReportComponent {
    user: User | undefined
    userId: number = 0

    filteredReports: Report[] = []
    reports: any[] = []

    constructor(
        private ticketSaleReportService: TicketSaleReportService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.authService.user$.subscribe((user) => {
            this.user = user
        })
        this.userId = this.authService.user$.getValue().id

        this.ticketSaleReportService.getAllCardSaleReports().subscribe({
            next: (data) => {
                this.reports = data.filter(
                    (report: any) => report.userId === this.userId
                )
                console.log('Reports:', this.reports)
            },
            error: (err) => console.error('Failed to load reports:', err),
        })
    }

    generateReport() {
        const reportData = {
            path: '',
            date: new Date().toISOString().split('T')[0],
            userId: this.userId,
        }

        this.ticketSaleReportService
            .createCardSaleReport(reportData)
            .subscribe({
                next: (data) => {
                    console.log('Report generated successfully:', data)
                    //this.loadReports()
                },
                error: (err) =>
                    console.error('Failed to generate report:', err),
            })
    }
}
