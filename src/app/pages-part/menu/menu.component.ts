import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class MenuComponent implements OnInit {
  menuItems: any[] = [];
  categories: string[] = [];
  isLoading: boolean = false;
  
  // Default fallback image if even the category placeholder fails
  private fallbackImage = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80';

  constructor(
    private menuService: MenuService, 
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadMenuItems();
  }

  loadMenuItems(): void {
    this.isLoading = true;
    this.alertService.loading('Loading menu items...');
    
    this.menuService.getMenuItems().subscribe({
      next: (items) => {
        this.menuItems = items;
        // Extract unique categories
        this.categories = [...new Set(items.map(item => item.category))];
        this.isLoading = false;
        this.alertService.closeLoading();
      },
      error: (error) => {
        this.isLoading = false;
        this.alertService.closeLoading();
        this.alertService.error('Error', 'Failed to load menu items. Please try again later.');
        console.error('Error loading menu items:', error);
      }
    });
  }

  getItemsByCategory(category: string): any[] {
    return this.menuItems.filter(item => item.category === category);
  }
  
  // Handle image loading errors
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    console.warn(`Failed to load image: ${img.src}`);
    img.src = this.fallbackImage;
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }
}

