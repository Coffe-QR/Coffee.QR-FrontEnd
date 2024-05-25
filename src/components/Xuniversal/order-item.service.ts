import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class OrderItemService {
    private apiUrl = 'https://localhost:44333/api/orderItems' // Adjust the API URL as needed

    constructor(private http: HttpClient) {}

    createOrderItem(orderItemData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}`, orderItemData)
    }

    getAllOrderItems(): Observable<any> {
        return this.http.get(`${this.apiUrl}/getAll`)
    }

    deleteOrderItem(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`)
    }

    getAllForOrder(orderId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/for-order/${orderId}`)
    }

    getOrderItemByOrderId(orderId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/getByOrderId/${orderId}`)
    }

    getQuantityByOrderIdAndItemId(
        orderId: number,
        itemId: number
    ): Observable<any> {
        return this.http.get(
            `${this.apiUrl}/getQuantityByOrderIdAndItemId/${orderId}/${itemId}`
        )
    }
}
