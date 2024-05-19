import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Ticket } from '../../auth/model/ticket.model'

@Injectable({
    providedIn: 'root',
})
export class TicketService {
    private apiUrl = 'https://localhost:44333/api/cards'

    constructor(private http: HttpClient) {}

    createCard(ticket: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, ticket, this.getHttpOptions())
    }

    deleteCard(cardId: number): Observable<any> {
        const url = `${this.apiUrl}/${cardId}`
        return this.http.delete<any>(url, this.getHttpOptions())
    }

    getAllByEventId(eventId: number): Observable<any> {
        const url = `${this.apiUrl}/event/${eventId}`
        return this.http.get<any>(url, this.getHttpOptions())
    }

    getAllCards(): Observable<any> {
        return this.http.get<any>(this.apiUrl, this.getHttpOptions())
    }

    getById(id: number): Observable<any> {
        const url = `${this.apiUrl}/${id}`
        return this.http.get<any>(url, this.getHttpOptions())
    }

    private getHttpOptions() {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        }
        return httpOptions
    }
}
