import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: []
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  loading = false;
  error: string | null = null;

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.loading = true;
    this.error = null;
    this.supabaseService.getItems().subscribe({
      next: (items) => {
        this.items = items;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar itens: ' + err.message;
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteItem(id: number): void {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      this.loading = true;
      this.error = null;
      this.supabaseService.deleteItem(id).subscribe({
        next: () => {
          this.loadItems();
        },
        error: (err) => {
          this.error = 'Erro ao excluir item: ' + err.message;
          this.loading = false;
          console.error(err);
        }
      });
    }
  }

  editItem(item: Item): void {
    // Emit event to parent component to open form with item data
    const event = new CustomEvent('editItem', { detail: item });
    window.dispatchEvent(event);
  }
}

