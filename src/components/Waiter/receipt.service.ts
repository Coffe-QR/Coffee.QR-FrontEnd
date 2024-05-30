import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable({
    providedIn: 'root',
})
export class ReceiptService {
    private apiUrl = 'https://localhost:44333/api/receipts'

    constructor(private http: HttpClient) {}

    createReceipt(moneyReceived: number, receiptData: any): Observable<any> {
        return this.http
            .post<any>(`${this.apiUrl}/${moneyReceived}`, receiptData, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                }),
            })
            .pipe(
                catchError((error) => {
                    throw 'Error in posting receipt data: ' + error
                })
            )
    }

    deleteReceipt(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`).pipe(
            catchError((error) => {
                throw 'Error in deleting receipt: ' + error
            })
        )
    }

    getAllForLocal(localId: number): Observable<any[]> {
        return this.http
            .get<any[]>(`${this.apiUrl}/getAllForLocal/${localId}`)
            .pipe(
                catchError((error) => {
                    throw 'Error in fetching receipts for local: ' + error
                })
            )
    }
}
