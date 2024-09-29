import { Component } from '@angular/core'
import { ContractService } from '../contract.service'
import { FrequencyService } from '../frequency.service'
import { Router } from '@angular/router'
import { ReportService } from '../report.service'

@Component({
    selector: 'app-create-new-report',
    templateUrl: './create-new-report.component.html',
    styleUrl: './create-new-report.component.scss',
})
export class CreateNewReportComponent {
    id: number = -1
    localId: number = 1
    companyId: number = 1
    description: string = ''
    date: string = ''
    frequency: string = ''
    supplyId: number = 1
    submitAttempted: boolean = false
    startDate: string = '' // Ensure this is a valid date format
    endDate: string = ''

    frequencies: string[] = []
    unitNumber: number = 1

    constructor(
        private contractService: ContractService,
        private frequencyService: FrequencyService,
        private reportService: ReportService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.frequencyService.getAllFrequencysUnit().subscribe({
            next: (res) => {
                this.frequencies = res
            },
        })
    }

    onSubmit(): void {
        const reportDto = {
            path: '',
            type: 'WEAKLY',
            start: this.startDate,
            end: this.endDate,
        }

        this.reportService.create(reportDto).subscribe({
            next: (response) => {
                this.router.navigate(['/report-all'])
            },
            error: (error) => console.error('Error creating item:', error),
        })
    }
}
