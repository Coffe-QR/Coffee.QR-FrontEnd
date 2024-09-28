import { Component, OnInit } from '@angular/core'
import { ContractService } from '../contract.service'
import { Router } from '@angular/router'
import { FrequencyService } from './../frequency.service'

@Component({
    selector: 'app-contract-create',
    templateUrl: './contract-create.component.html',
    styleUrls: ['./contract-create.component.scss'],
})
export class ContractCreateComponent implements OnInit {
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
        const freq = {
            unit: this.frequency,
            UnitQuantity: this.unitNumber,
        }

        this.frequencyService.creatae(freq).subscribe({
            next: (res) => {
                const contractData = {
                    localId: this.localId,
                    companyId: this.companyId,
                    description: this.description,
                    start: this.startDate, // Use startDate instead of date
                    end: this.endDate,
                    //frequency: Number(this.frequency),
                    supplyId: this.supplyId,
                    frequencyId: res.id,
                }

                console.log(contractData)

                this.submitAttempted = true
                if (this.supplyId <= 0) {
                    return
                }

                this.contractService.create(contractData).subscribe({
                    next: (response) => {
                        this.router.navigate(['/contract-item'])
                        localStorage.setItem('contract-id', response.id)
                    },
                    error: (error) =>
                        console.error('Error creating item:', error),
                })
            },
        })
    }
}
