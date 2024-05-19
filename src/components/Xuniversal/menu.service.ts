import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = 'https://localhost:44333/api/menus'; // Change the port and host as needed

  constructor(private http: HttpClient) { }

  createMenu(menuData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, menuData)
  }

  getAllMenus(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAll`)
  }

  getMenuByLocalId(localId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/byLocal/${localId}`)
  }

  getMenuById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/getById/${id}`)
  }

  deleteMenu(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  updateMenu(menuData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/UpdateMenu`, menuData)
  }
}