import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { ErrorSupplyDto } from '../../auth/model/error-supply.model'

@Injectable({
    providedIn: 'root',
})
export class ErrorItemService {
    private apiUrl = 'https://localhost:44333/api/errorSupplies'

    constructor(private http: HttpClient) {}

    getAllForLocal(localId: number): Observable<any> {
        return this.http.get(this.apiUrl + '/getAllForLocal/' + localId)
    }

    createSupplyItems(supplyItems: ErrorSupplyDto[]): Observable<any> {
        return this.http.post(this.apiUrl + '/create-list', supplyItems)
    }
}
