import { Component, OnInit } from '@angular/core'
import { ContractService } from '../contract.service'
import { Router } from '@angular/router'

@Component({
    selector: 'app-contract-create',
    templateUrl: './contract-create.component.html',
    styleUrl: './contract-create.component.scss',
})
export class ContractCreateComponent implements OnInit {
    id: number = -1
    localId: number = 1
    companyId: number = 1
    description: string = ''
    date: string = ''
    frequency: number = 0
    supplyId: number = 1
    submitAttempted: boolean = false

    constructor(
        private contractService: ContractService,
        private router: Router
    ) {}

    ngOnInit(): void {}

    onSubmit(): void {
        const contractData = {
            id: this.id,
            localId: this.localId,
            companyId: this.companyId,
            description: this.description,
            date: this.date,
            frequency: Number(this.frequency),
            supplyId: this.supplyId,
        }

        this.submitAttempted = true
        if (this.supplyId <= 0) {
            return
        }

        this.contractService.create(contractData).subscribe({
            next: (response) => {
                this.router.navigate(['/contract-item'])
                localStorage.setItem('contract-id', response.id)
            },
            error: (error) => console.error('Error creating item:', error),
        })
    }
}
