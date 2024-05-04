import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Item } from '../../auth/model/item-model'

@Injectable({
    providedIn: 'root',
})
export class ItemService {
    private apiUrl = 'https://localhost:44333/api/items'

    constructor(private http: HttpClient) {}

    getAllItems(): Observable<any> {
        return this.http.get(`${this.apiUrl}/getAll`)
    }
}
