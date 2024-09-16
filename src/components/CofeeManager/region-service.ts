import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Item } from '../../auth/model/item.model'

@Injectable({
    providedIn: 'root',
})
export class RegionService {
    private apiUrl = 'https://localhost:44333/api/menuRegions'

    constructor(private http: HttpClient) {}

    getAllRegions(): Observable<any> {
        return this.http.get(`${this.apiUrl}/getAll`)
    }

    getAllRegionsByMenuId(id: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/byMenu/${id}`)
    }

    createRegion(RegionData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}`, RegionData)
    }

    deleteRegion(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`)
    }

    getRegionById(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/getById/${id}`)
    }

    updateRegion(RegionData: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/UpdateMenuRegion`, RegionData)
    }
}
