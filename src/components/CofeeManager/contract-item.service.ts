import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { ContractItem } from './../../auth/model/contract-item.model'

@Injectable({
    providedIn: 'root',
})
export class ContractItemService {
    private apiUrl = 'https://localhost:44333/api/contractItems'

    constructor(private http: HttpClient) {}

    createContractItems(contractItems: ContractItem[]): Observable<any> {
        return this.http.post(this.apiUrl + '/create-list', contractItems)
    }

    getAllForSupply(supplyId: number): Observable<any> {
        return this.http.get(this.apiUrl + '/for-supply/' + supplyId)
    }
}
