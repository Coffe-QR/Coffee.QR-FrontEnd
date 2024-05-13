import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { SupplyItem } from '../../auth/model/supply-item.model'

@Injectable({
    providedIn: 'root',
})
export class SupplyItemService {
    private apiUrl = 'https://localhost:44333/api/supplyItems'

    constructor(private http: HttpClient) {}

    createSupplyItems(supplyItems: SupplyItem[]): Observable<any> {
        return this.http.post(this.apiUrl + '/create-list', supplyItems)
    }

    getAllForSupply(supplyId: number): Observable<any> {
        return this.http.get(this.apiUrl + '/for-supply/' + supplyId)
    }
}
