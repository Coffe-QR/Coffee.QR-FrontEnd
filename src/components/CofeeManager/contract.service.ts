import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class ContractService {
    private apiUrl = 'https://localhost:44333/api/contracts'

    constructor(private http: HttpClient) {}

    getAllForLocal(localId: number): Observable<any> {
        return this.http.get(this.apiUrl + '/getAllForLocal/' + localId)
    }
}
