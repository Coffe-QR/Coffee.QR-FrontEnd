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
}
