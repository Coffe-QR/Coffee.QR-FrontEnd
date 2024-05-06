import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
    providedIn: 'root',
})
export class UploadService {
    private uploadUrl = 'https://localhost:44333/api/upload/upload'

    constructor(private http: HttpClient) {}

    uploadImage(file: File): Observable<any> {
        const formData = new FormData()
        formData.append('file', file)

        return this.http.post(this.uploadUrl, formData)
    }
}
