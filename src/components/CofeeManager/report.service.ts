import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Report } from '../../auth/model/report.model'

@Injectable({
    providedIn: 'root',
})
export class ReportService {
    private apiUrl = 'https://localhost:44333/api/reports'

    constructor(private http: HttpClient) {}

    getAllForLocal(localId: number): Observable<any> {
        return this.http.get(this.apiUrl + '/getAllForLocal/' + localId)
    }

    getAllCostForLocal(localId: number): Observable<any> {
        return this.http.get(this.apiUrl + '/getAllCoastForLocal/' + localId)
    }
}
