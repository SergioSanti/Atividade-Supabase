import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupabaseService } from '../services/supabase.service';
import { Item } from '../models/item';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: []
})
export class ItemFormComponent implements OnInit {
  @Input() item: Item | null = null;
  @Output() itemSaved = new EventEmitter<void>();
  
  itemForm: FormGroup;
  loading = false;
  error: string | null = null;
  success: string | null = null;

  constructor(
    private fb: FormBuilder,
    private supabaseService: SupabaseService
  ) {
    this.itemForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    if (this.item) {
      this.itemForm.patchValue({
        name: this.item.name,
        description: this.item.description,
        price: this.item.price
      });
    }
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      this.loading = true;
      this.error = null;
      this.success = null;

      const formValue = this.itemForm.value;

      if (this.item && this.item.id) {
        // Update existing item
        this.supabaseService.updateItem(this.item.id, formValue).subscribe({
          next: () => {
            this.success = 'Item atualizado com sucesso!';
            this.loading = false;
            this.itemForm.reset();
            this.itemSaved.emit();
            setTimeout(() => {
              this.success = null;
            }, 3000);
          },
          error: (err) => {
            this.error = 'Erro ao atualizar item: ' + err.message;
            this.loading = false;
            console.error(err);
          }
        });
      } else {
        // Create new item
        this.supabaseService.createItem(formValue).subscribe({
          next: () => {
            this.success = 'Item criado com sucesso!';
            this.loading = false;
            this.itemForm.reset();
            this.itemSaved.emit();
            setTimeout(() => {
              this.success = null;
            }, 3000);
          },
          error: (err) => {
            this.error = 'Erro ao criar item: ' + err.message;
            this.loading = false;
            console.error(err);
          }
        });
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  resetForm(): void {
    this.itemForm.reset();
    this.item = null;
    this.error = null;
    this.success = null;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.itemForm.controls).forEach(key => {
      const control = this.itemForm.get(key);
      control?.markAsTouched();
    });
  }

  get name() {
    return this.itemForm.get('name');
  }

  get description() {
    return this.itemForm.get('description');
  }

  get price() {
    return this.itemForm.get('price');
  }
}

