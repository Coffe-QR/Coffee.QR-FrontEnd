import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class JobsReportService {
    private apiUrl = 'https://localhost:44333/'

    constructor(private http: HttpClient) {}

    getAllCostForLocal(localId: number): Observable<any> {
        return this.http.get(this.apiUrl + '/for-local/' + localId)
    }
}
