import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  addCategory(category: AddCategoryRequest): Observable<void> {
    return this.http.post<void>(
      `http://localhost:5053/api/categories`,
      category
    );
  }

  getAllCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(`http://localhost:5053/api/categories`);
  }
}
