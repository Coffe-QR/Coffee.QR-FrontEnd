import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable({
    providedIn: 'root',
})
export class RegionItemService {
    private apiUrl = 'https://localhost:44333/api/regionItems'

    constructor(private http: HttpClient) {}

    create(regionItemDto: any): Observable<any> {
        return this.http
            .post<any>(`${this.apiUrl}`, regionItemDto)
            .pipe(catchError(this.handleError))
    }

    getAll(): Observable<any> {
        return this.http
            .get<any>(`${this.apiUrl}/getAll`)
            .pipe(catchError(this.handleError))
    }

    deleteRegionItem(id: number): Observable<any> {
        return this.http
            .delete<any>(`${this.apiUrl}/${id}`)
            .pipe(catchError(this.handleError))
    }

    deleteByRegionIdAndItemId(
        regionId: number,
        itemId: number
    ): Observable<any> {
        return this.http
            .delete<any>(
                `${this.apiUrl}/DeleteByRegionIdAndItemId/${regionId}/${itemId}`
            )
            .pipe(catchError(this.handleError))
    }

    getAllForRegion(regionId: number): Observable<any> {
        return this.http
            .get<any>(`${this.apiUrl}/for-region/${regionId}`)
            .pipe(catchError(this.handleError))
    }

    getAllNotOnRegion(regionId: number): Observable<any> {
        return this.http
            .get<any>(`${this.apiUrl}/not-on-region/${regionId}`)
            .pipe(catchError(this.handleError))
    }

    private handleError(error: any): Observable<never> {
        console.error('An error occurred', error)
        return throwError(error)
    }
}
