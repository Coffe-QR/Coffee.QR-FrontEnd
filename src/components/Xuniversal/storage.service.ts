import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    private apiUrl = 'https://localhost:44333/api/storages'

    constructor(private http: HttpClient) {}

    createStorage(storageData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}`, storageData)
    }

    getAllStorages(): Observable<any> {
        return this.http.get(`${this.apiUrl}/getAll`)
    }

    deleteStorage(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`)
    }

    getStorageById(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`)
    }
}
