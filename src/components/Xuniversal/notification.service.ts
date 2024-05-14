import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private apiUrl = 'https://localhost:44333/api/notification'

    constructor(private http: HttpClient) {}

    createNotification(notificationData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}`, notificationData)
    }

    getAllNotifications(): Observable<any> {
        return this.http.get(`${this.apiUrl}/getAll`)
    }

    deactivateNotification(id: number): Observable<any> {
        return this.http.put(`${this.apiUrl}/deactivate/${id}`, {})
    }

    getAllActiveNotifications(localId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/getAllActive`, {
            params: { localId },
        })
    }

    deleteNotification(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`)
    }
}
