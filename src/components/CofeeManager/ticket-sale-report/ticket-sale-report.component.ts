import { Component } from '@angular/core'

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
    filteredReports: Report[] = [
        {
            id: 'R001',
            type: 'Annual',
            date: '2023-01-01',
            path: 'https://example.com/report1.pdf',
        },
        {
            id: 'R002',
            type: 'Monthly',
            date: '2023-02-01',
            path: 'https://example.com/report2.pdf',
        },
        {
            id: 'R003',
            type: 'Monthly',
            date: '2023-03-01',
            path: 'https://example.com/report3.pdf',
        },
        {
            id: 'R004',
            type: 'Annual',
            date: '2023-04-01',
            path: 'https://example.com/report4.pdf',
        },
        {
            id: 'R005',
            type: 'Annual',
            date: '2023-05-01',
            path: 'https://example.com/report5.pdf',
        },
    ]
    reports: any[] = []

    constructor() {}

    ngOnInit() {}
}
