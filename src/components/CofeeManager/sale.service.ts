import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Item } from '../../auth/model/item.model'

@Injectable({
    providedIn: 'root',
})
export class SaleService {
    private apiUrl = 'https://localhost:44333/api/sales'

    constructor(private http: HttpClient) {}

    getAllCostForLocal(companyId: number): Observable<any> {
        return this.http.get(this.apiUrl + '/get-for-company/' + companyId)
    }
}
