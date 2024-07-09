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

    createCategory(request: any): Observable<any> {
        return this.http.post(`${this.baseUrl}/createCategory`, request)
    }

    getChartDetails(chartKey: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/getChartDetails/${chartKey}`)
    }

    getChartCategories(chartKey: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/getChartCategories/${chartKey}`)
    }

    updateCategory(
        eventKey: string,
        objectIds: string[],
        newCategory: string
    ): Observable<any> {
        const body = { eventKey, objectIds, newCategory }
        return this.http.post(`${this.baseUrl}/updateCategory`, body)
    }
}
