import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class EventService {
    private apiUrl = 'https://localhost:44333/api/event'

    constructor(private http: HttpClient) {}

    createEvent(eventData: any): Observable<any> {
        return this.http.post(this.apiUrl, eventData)
    }

    getAllEvents(): Observable<any> {
        return this.http.get(`${this.apiUrl}/getAll`)
    }

    deleteEvent(eventId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${eventId}`)
    }
}
