import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemApiDto } from './items-api-dto.model';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  private apiUrl = '/api/items'; // Matches the key in createDb()

  constructor(private http: HttpClient) {}

  getItems(): Observable<ItemApiDto[]> {
    return this.http.get<ItemApiDto[]>(this.apiUrl);
  }
}
