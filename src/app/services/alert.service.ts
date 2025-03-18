    import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  // Success message
  success(title: string, message: string = '', timer: number = 5000): void {
    Swal.fire({
      icon: 'success',
      title: title,
      text: message,
      timer: timer,
      timerProgressBar: true,
      showConfirmButton: false,
      position: 'top-end',
      toast: true
    });
  }

  // Error message
  error(title: string, message: string = ''): void {
    Swal.fire({
      icon: 'error',
      title: title,
      text: message,
      confirmButtonText: 'OK',
      confirmButtonColor: '#6e8efb'
    });
  }

  // Warning message
  warning(title: string, message: string = ''): void {
    Swal.fire({
      icon: 'warning',
      title: title,
      text: message,
      confirmButtonText: 'OK',
      confirmButtonColor: '#6e8efb'
    });
  }

  // Info message
  info(title: string, message: string = ''): void {
    Swal.fire({
      icon: 'info',
      title: title,
      text: message,
      confirmButtonText: 'OK',
      confirmButtonColor: '#6e8efb'
    });
  }

  // Confirmation dialog
  confirm(title: string, message: string = '', confirmText: string = 'Yes', cancelText: string = 'No'): Promise<boolean> {
    return new Promise((resolve) => {
      Swal.fire({
        title: title,
        text: message,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#6e8efb',
        cancelButtonColor: '#ff4757',
        confirmButtonText: confirmText,
        cancelButtonText: cancelText
      }).then((result) => {
        resolve(result.isConfirmed);
      });
    });
  }

  // Loading indicator
  loading(title: string = 'Loading...'): void {
    Swal.fire({
      title: title,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }

  // Close loading indicator
  closeLoading(): void {
    Swal.close();
  }

  // Custom toast notification
  toast(title: string, icon: 'success' | 'error' | 'warning' | 'info' = 'success', timer: number = 5000): void {
    Swal.fire({
      title: title,
      icon: icon,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: timer,
      timerProgressBar: true
    });
  }
} 