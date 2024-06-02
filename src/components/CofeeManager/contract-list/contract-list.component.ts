import { Component } from '@angular/core'
import { Contract } from '../../../auth/model/contract.model'
import { ContractService } from '../contract.service'

@Component({
    selector: 'app-contract-list',
    templateUrl: './contract-list.component.html',
    styleUrl: './contract-list.component.scss',
})
export class ContractListComponent {
    filteredContracts: Contract[] = []
    contracts: Contract[] = []

    constructor(private contractService: ContractService) {}

    ngOnInit() {
        this.contractService.getAllForLocal(1).subscribe({
            next: (response) => {
                this.filteredContracts = response
                this.contracts = response
            },
            error: (error) => console.error('Error creating event:', error),
        })
    }

    getFrequency(type: number) {
        return type === 0 ? 'Monthly' : 'Yearly'
    }

    filterCategory(category: number) {
        if (category === 2) {
            this.filteredContracts = [...this.contracts]
        } else {
            this.filteredContracts = this.contracts.filter(
                (contract) => contract.frequency == category
            )
        }
    }
}
