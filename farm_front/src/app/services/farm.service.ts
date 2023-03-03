import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment';
import { Farm } from './../models/Farm'

@Injectable()
export class FarmService {

  private readonly apiFarmUrl = environment.api_server + '/farms';
  private readonly options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) {}

  create(farm: Farm) {
    return this.http.post(`${this.apiFarmUrl}`, JSON.stringify(farm), this.options); 
  }

  read(id: number): Observable<Farm> {
    return this.http.get<Farm>(`${this.apiFarmUrl}/${id}`); 
  }

  update(farm: Farm) {
    return this.http.put(`${this.apiFarmUrl}`, JSON.stringify(farm), this.options); 
  }

  delete(id: number) {
    return this.http.delete(`${this.apiFarmUrl}/${id}`); 
  }

  list(): Observable<Farm[]> {
    return this.http.get<Farm[]>(this.apiFarmUrl); 
  }
}
