import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = 'http://localhost/CafeX/api';
  
  // Placeholder images from the internet with proper typing
  private placeholderImages: {[key: string]: string} = {
    'Coffee': 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    'Tea': 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    'Breakfast': 'https://images.unsplash.com/photo-1533089860892-a9b969df67d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    'Lunch': 'https://images.unsplash.com/photo-1600335895229-6e75511892c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    'Dessert': 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    'Bakery': 'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    'default': 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80'
  };

  constructor(private http: HttpClient) { }

  getMenuItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/menu/get_menu.php`).pipe(
      map(items => items.map(item => ({
        ...item,
        price: parseFloat(item.price), // Ensure price is a number
        // Use placeholder images based on category
        image_url: this.getPlaceholderImage(item.category)
        // Note: In the future, this will be replaced with actual uploaded images
        // image_url: item.image_url // Uncomment this when admin upload is implemented
      })))
    );
  }
  
  // Helper method to get placeholder image based on category
  private getPlaceholderImage(category: string): string {
    return this.placeholderImages[category] || this.placeholderImages['default'];
  }
} 