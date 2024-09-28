import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class FrequencyService {
    private apiUrl = 'https://localhost:44333/api/frequencies'

    constructor(private http: HttpClient) {}

    creatae(freq: any): Observable<any> {
        return this.http.post(`${this.apiUrl}`, freq)
    }

    getAllFrequencysUnit(): Observable<any> {
        return this.http.get(`${this.apiUrl}/units`)
    }

    deleteEvent(eventId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${eventId}`)
    }

    getAllEventsByUserId(userId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/byUser/${userId}`)
    }

    getEventById(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`)
    }
}
