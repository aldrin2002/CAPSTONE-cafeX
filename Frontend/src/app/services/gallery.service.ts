import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {
  private apiUrl = 'http://localhost/CafeX/api';

  constructor(private http: HttpClient) { }

  getGalleryItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/gallery/get_gallery.php`);
  }
} 