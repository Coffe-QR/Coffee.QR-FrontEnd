import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class SeatsioService {
    private baseUrl = 'https://localhost:44333/api/seatsio'

    constructor(private http: HttpClient) {}

    bookSeats(eventName: string, seatLabels: string[]): Observable<any> {
        const body = { eventName, seatsToBook: seatLabels }
        return this.http.post(`${this.baseUrl}/book`, body)
    }

    holdSeats(eventName: string, seatLabels: string[]): Observable<any> {
        const body = { eventName, seatsToHold: seatLabels }
        return this.http.post(`${this.baseUrl}/hold`, body)
    }
}
