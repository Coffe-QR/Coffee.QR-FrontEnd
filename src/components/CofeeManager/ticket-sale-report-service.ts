import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable({
    providedIn: 'root',
})
export class TicketSaleReportService {
    private apiUrl = 'https://localhost:44333/api/cardSaleReport'

    constructor(private http: HttpClient) {}

    createCardSaleReport(reportData: any): Observable<any> {
        return this.http
            .post<any>(`${this.apiUrl}`, reportData, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                }),
            })
            .pipe(
                catchError((error) => {
                    throw 'Error in posting card sale report: ' + error
                })
            )
    }

    getAllCardSaleReports(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/getAll`).pipe(
            catchError((error) => {
                throw 'Error in fetching all card sale reports: ' + error
            })
        )
    }

    deleteCardSaleReport(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`).pipe(
            catchError((error) => {
                throw 'Error in deleting card sale report: ' + error
            })
        )
    }
}
