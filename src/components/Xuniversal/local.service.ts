import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class LocalService {
    private apiUrl = 'https://localhost:44333/api/local'

    constructor(private http: HttpClient) {}

    createLocal(localData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}`, localData)
    }

    getAllLocals(): Observable<any> {
        return this.http.get(`${this.apiUrl}/getAll`)
    }

    deleteLocal(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`)
    }

    getLocalById(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`)
    }
}
