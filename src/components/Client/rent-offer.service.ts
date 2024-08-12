import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable({
    providedIn: 'root',
})
export class RentOfferService {
    private apiUrl = 'https://localhost:44333/api/RentOffer'

    constructor(private http: HttpClient) {}

    // Create a new RentOffer
    createRentOffer(rentOffer: any): Observable<any> {
        return this.http
            .post<any>(this.apiUrl, rentOffer)
            .pipe(catchError(this.handleError<any>('createRentOffer')))
    }

    // Get a RentOffer by ID
    getRentOfferById(id: number): Observable<any> {
        const url = `${this.apiUrl}/${id}`
        return this.http
            .get<any>(url)
            .pipe(
                catchError(this.handleError<any>(`getRentOfferById id=${id}`))
            )
    }

    // Get all RentOffers
    getAllRentOffers(): Observable<any[]> {
        return this.http
            .get<any[]>(this.apiUrl)
            .pipe(catchError(this.handleError<any[]>('getAllRentOffers', [])))
    }

    // Get all RentOffers by LocalId
    getRentOffersByLocalId(localId: number): Observable<any[]> {
        const url = `${this.apiUrl}/local/${localId}`
        return this.http
            .get<any[]>(url)
            .pipe(
                catchError(
                    this.handleError<any[]>('getRentOffersByLocalId', [])
                )
            )
    }

    // Update a RentOffer
    updateRentOffer(id: number, rentOffer: any): Observable<any> {
        const url = `${this.apiUrl}/${id}`
        return this.http
            .put<any>(url, rentOffer)
            .pipe(catchError(this.handleError<any>('updateRentOffer')))
    }

    // Delete a RentOffer
    deleteRentOffer(id: number): Observable<any> {
        const url = `${this.apiUrl}/${id}`
        return this.http
            .delete<any>(url)
            .pipe(catchError(this.handleError<any>('deleteRentOffer')))
    }

    // Handle HTTP errors
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(`${operation} failed: ${error.message}`)
            return of(result as T)
        }
    }

    // Change the status of a RentOffer to ACCEPTED
    acceptRentOffer(id: number): Observable<any> {
        const url = `${this.apiUrl}/${id}/accept`
        return this.http
            .patch<any>(url, {})
            .pipe(catchError(this.handleError<any>('acceptRentOffer')))
    }

    // Change the status of a RentOffer to DECLINED
    declineRentOffer(id: number): Observable<any> {
        const url = `${this.apiUrl}/${id}/decline`
        return this.http
            .patch<any>(url, {})
            .pipe(catchError(this.handleError<any>('declineRentOffer')))
    }
}
