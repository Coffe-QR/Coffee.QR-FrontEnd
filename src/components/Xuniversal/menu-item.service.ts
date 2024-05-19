import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuItemService {
  private apiUrl = 'https://localhost:44333/api/menuItems'; // Adjust the API URL as needed

  constructor(private http: HttpClient) { }

  createMenuItem(menuItemData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, menuItemData)
  }

  getAllMenuItems(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getAll`)
  }

  deleteMenuItem(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  deleteByMenuIdAndItemId(menuId: number, itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/DeleteByMenuIdAndItemId/${menuId}/${itemId}`)
  }

  getAllForMenu(menuId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/for-menu/${menuId}`)
  }

  getAllFoodForMenu(menuId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/food-for-menu/${menuId}`)
  }

  getAllDrinksForMenu(menuId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/drinks-for-menu/${menuId}`)
  }

  getAllNotOnMenu(menuId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/not-on-menu/${menuId}`)
  }

  getMenuItemById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`)
  }

  updateMenuItem(menuItemData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, menuItemData)
  }
}