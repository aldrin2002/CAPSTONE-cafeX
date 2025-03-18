import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GalleryService } from '../../services/gallery.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class GalleryComponent implements OnInit {
  galleryItems: any[] = [];
  isLoading: boolean = false;
  selectedItem: any = null;

  // Placeholder images from the internet
  private placeholderImages = [
    {
      title: 'Cappuccino Art',
      description: 'Our baristas are skilled in creating beautiful latte art on every cappuccino.',
      image_url: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Cozy Corner',
      description: 'The perfect spot to enjoy your coffee and get some work done.',
      image_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Fresh Pastries',
      description: 'Our pastries are baked fresh every morning.',
      image_url: 'https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Coffee Beans',
      description: 'We source our beans from sustainable farms around the world.',
      image_url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Outdoor Seating',
      description: 'Enjoy your coffee in our beautiful outdoor seating area.',
      image_url: 'https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Specialty Drinks',
      description: 'Try one of our seasonal specialty drinks, crafted with care.',
      image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    }
  ];

  constructor(
    private galleryService: GalleryService, 
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadGalleryItems();
  }

  loadGalleryItems(): void {
    this.isLoading = true;
    this.alertService.loading('Loading gallery...');
    
    // Commenting out the actual service call for now
    // this.galleryService.getGalleryItems().subscribe({
    //   next: (items) => {
    //     this.galleryItems = items;
    //     this.isLoading = false;
    //     this.alertService.closeLoading();
    //   },
    //   error: (error) => {
    //     this.isLoading = false;
    //     this.alertService.closeLoading();
    //     this.alertService.error('Error', 'Failed to load gallery items. Please try again later.');
    //     console.error('Error loading gallery items:', error);
    //   }
    // });

    // Using placeholder images for now
    setTimeout(() => {
      this.galleryItems = this.placeholderImages;
      this.isLoading = false;
      this.alertService.closeLoading();
    }, 1000); // Simulate loading delay
  }

  openImage(item: any): void {
    this.selectedItem = item;
  }

  closeImage(): void {
    this.selectedItem = null;
  }

  goBack(): void {
    this.router.navigate(['/home']); // Navigate back to the home page
  }
}
