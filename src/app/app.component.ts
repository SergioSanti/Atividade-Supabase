import { Component, OnInit } from '@angular/core';
import { Item } from './models/item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {
  currentItem: Item | null = null;

  ngOnInit(): void {
    console.log('AppComponent inicializado!');
    // Listen for edit events from item list
    window.addEventListener('editItem', ((event: CustomEvent<Item>) => {
      this.currentItem = event.detail;
      // Scroll to form
      setTimeout(() => {
        const formElement = document.querySelector('.card');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }) as EventListener);
  }

  onItemSaved(): void {
    this.currentItem = null;
  }

  clearForm(): void {
    this.currentItem = null;
  }
}

