import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class JobReportService {
    private apiUrl = 'https://localhost:44333/api/jobApplicationsReport'

    constructor(private http: HttpClient) {}

    getAllCostForLocal(localId: number): Observable<any> {
        return this.http.get(this.apiUrl + '/for-local/' + localId)
    }
}
