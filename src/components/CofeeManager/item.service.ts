import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Item } from '../../auth/model/item.model'

@Injectable({
    providedIn: 'root',
})
export class ItemService {
    private apiUrl = 'https://localhost:44333/api/items'

    constructor(private http: HttpClient) {}

    getAllItems(): Observable<any> {
        return this.http.get(`${this.apiUrl}/getAll`)
    }

    createItem(itemData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}`, itemData)
      }

    deleteItem(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`)
      }
    
    getItemById(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/getById/${id}`)
      }
    
    updateItem(itemData: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/UpdateMenu`, itemData)
      }
}
