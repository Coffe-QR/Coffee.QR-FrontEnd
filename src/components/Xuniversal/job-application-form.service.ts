import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobApplicationService {
    private apiUrl = 'https://localhost:44333/api/jobApplications';

    constructor(private http: HttpClient) {}

    createJobApplication(applicationData: any): Observable<any> {
        return this.http.post(this.apiUrl, applicationData);
    }

    getAllJobApplications(): Observable<any> {
        return this.http.get(`${this.apiUrl}/getAll`);
    }

    getJobApplicationsByLocal(localId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}?localId=${localId}`);
      }
}