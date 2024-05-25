import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    private apiUrl = 'https://localhost:44333/api/order' // Adjust the API URL as needed

    constructor(private http: HttpClient) {}

    createOrder(orderData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}`, orderData)
    }

    getAllOrders(): Observable<any> {
        return this.http.get(`${this.apiUrl}/getAll`)
    }

    deleteOrder(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`)
    }

    getOrdersByLocalIdAndIsActive(localId: number): Observable<any> {
        return this.http.get(
            `${this.apiUrl}/getByLocalIdAndIsActive/${localId}`
        )
    }

    deactivateOrder(id: number): Observable<any> {
        return this.http.put(`${this.apiUrl}/deactivate/${id}`, {})
    }

    getOrderById(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/getById/${id}`)
    }
}
