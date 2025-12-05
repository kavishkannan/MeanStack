import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface BookRow {
  id?: number;
  title: string;
  isbn?: string;
  published_year?: number;
  price?: number;
  author_id?: number;
  author_name?: string;
  category_id?: number;
  category_name?: string;
  copies?: number;
  location?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private base = 'http://localhost:4000/api/books';

  constructor(private http: HttpClient) { }

  list(params: any): Observable<{ data: { books: BookRow[] }; total: number }> {
    let httpParams = new HttpParams();
    Object.keys(params || {}).forEach(k => {
      if (params[k] !== null && params[k] !== undefined) {
        httpParams = httpParams.set(k, params[k].toString());
      }
    });
    return this.http.get<{ data: { books: BookRow[] }; total: number }>(this.base, { params: httpParams });
  }

  get(id: number) {
    return this.http.get<BookRow>(`${this.base}/${id}`);
  }

  create(payload: any) {
    return this.http.post(this.base, payload);
  }

  update(id: number, payload: any) {
    return this.http.put(`${this.base}/${id}`, payload);
  }

  delete(id: number) {
    return this.http.delete(`${this.base}/${id}`);
  }

  // helpers for selects (authors, categories)

  getAuthors() {
    return this.http.get<{ success: boolean; data: any[] }>('http://localhost:4000/api/authors');
  }

  getCategories() {
    return this.http.get<{ success: boolean; data: any[] }>('http://localhost:4000/api/categories');
  }
}
