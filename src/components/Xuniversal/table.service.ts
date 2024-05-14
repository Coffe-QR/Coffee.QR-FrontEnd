import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class TableService {
    private apiUrl = 'https://localhost:44333/api/table'

    constructor(private http: HttpClient) {}

    createTable(tableData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}`, tableData)
    }

    getAllTables(): Observable<any> {
        return this.http.get(`${this.apiUrl}/getAll`)
    }

    getTableById(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/getById/${id}`)
    }

    deleteTable(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`)
    }
}
