import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class CompanyService {
    private apiUrl = 'https://localhost:44333/api/companies'

    constructor(private http: HttpClient) {}
}
