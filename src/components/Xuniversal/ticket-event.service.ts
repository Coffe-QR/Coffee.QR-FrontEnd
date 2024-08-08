import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Ticket } from '../../auth/model/ticket.model'

@Injectable({
    providedIn: 'root',
})
export class TicketEventService {
    private apiUrl = 'https://localhost:44333/api/cardevents'

    constructor(private http: HttpClient) {}

    createCardEvent(cardEventDto: any): Observable<any> {
        return this.http.post(
            `${this.apiUrl}`,
            cardEventDto,
            this.getHttpOptions()
        )
    }

    deleteCardEvent(cardEventId: number): Observable<any> {
        return this.http.delete(
            `${this.apiUrl}/${cardEventId}`,
            this.getHttpOptions()
        )
    }

    getAllByEventId(eventId: number): Observable<any> {
        return this.http.get(
            `${this.apiUrl}/event/${eventId}`,
            this.getHttpOptions()
        )
    }

    getAllCardEvents(): Observable<any> {
        return this.http.get(`${this.apiUrl}`, this.getHttpOptions())
    }

    getByIdAsync(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`, this.getHttpOptions())
    }

    getByCardIdAsync(cardId: number): Observable<any> {
        return this.http.get<any>(
            `${this.apiUrl}/card/${cardId}`,
            this.getHttpOptions()
        )
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
