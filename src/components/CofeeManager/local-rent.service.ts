import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class LocalRentService {
    private apiUrl = 'https://localhost:44333/api/LocalRentPriceList'

    constructor(private http: HttpClient) {}

    createLocalRentPriceList(localRentPriceListDto: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, localRentPriceListDto)
    }

    getActiveLocalRentPriceList(localId: number): Observable<any> {
        const url = `${this.apiUrl}/active/${localId}`
        return this.http.get<any>(url)
    }
}
