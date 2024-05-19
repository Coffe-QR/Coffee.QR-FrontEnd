import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {
  private apiUrl = 'https://localhost:44333/api/jobApplications'; 

  constructor(private http: HttpClient) {}

  getJobApplicationsByLocal(localId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/jobsByLocal/${localId}`);
  }
}
