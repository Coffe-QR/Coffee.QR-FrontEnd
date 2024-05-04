import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class SupplyService {
    private apiUrl = 'https://localhost:44333/api/supplies'

    constructor(private http: HttpClient) {}

    createSupply(supply: any): Observable<any> {
        return this.http.post(this.apiUrl, supply)
    }
}
