import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { TicketUser } from '../../auth/model/ticket-user.model'

@Injectable({
    providedIn: 'root',
})
export class TicketUserService {
    private apiUrl = 'https://localhost:44333/api/CardUser'

    constructor(private http: HttpClient) {}

    createCheckoutSession(ticketId: string): Observable<{ sessionId: string }> {
        return this.http.post<{ sessionId: string }>(
            this.apiUrl + '/create-checkout-session',
            { ticketId }
        )
    }

    getAllCardUsers(): Observable<TicketUser[]> {
        return this.http.get<TicketUser[]>(this.apiUrl, this.getHttpOptions())
    }

    getCardUserById(id: number): Observable<TicketUser> {
        const url = `${this.apiUrl}/${id}`
        return this.http.get<TicketUser>(url, this.getHttpOptions())
    }

    createCardUser(cardUser: TicketUser): Observable<TicketUser> {
        return this.http.post<TicketUser>(
            this.apiUrl,
            cardUser,
            this.getHttpOptions()
        )
    }

    updateCardUser(id: number, cardUser: TicketUser): Observable<void> {
        const url = `${this.apiUrl}/${id}`
        return this.http.put<void>(url, cardUser, this.getHttpOptions())
    }

    deleteCardUser(id: number): Observable<void> {
        const url = `${this.apiUrl}/${id}`
        return this.http.delete<void>(url, this.getHttpOptions())
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
