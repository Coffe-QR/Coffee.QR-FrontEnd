import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class LocalUserService {
    private apiUrl = 'https://localhost:44333/api/localUsers'

    constructor(private http: HttpClient) {}

    createLocalUser(localUserData: any): Observable<any> {
        return this.http.post(this.apiUrl, localUserData)
    }

    getAllLocalUsers(): Observable<any> {
        return this.http.get(`${this.apiUrl}/getAll`)
    }

    getLocalUserById(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`)
    }

    deleteLocalUser(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`)
    }

    getLocalUserByUserId(userId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/getByUserId/${userId}`)
    }

    updateLocalUser(localUserData: any): Observable<any> {
        return this.http.put(this.apiUrl, localUserData)
    }
}
