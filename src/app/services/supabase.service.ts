import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Item } from '../models/item';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private SUPABASE_URL = 'https://dbhxjvzodzaqamcsswsz.supabase.co';
  private SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRiaHhqdnpvZHphcWFtY3Nzd3N6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0NTczNTAsImV4cCI6MjA3ODAzMzM1MH0.Vkt1_dMc6Py3yRkpYKAdsw755eeCsZc8yfXqXdn5nvw';

  constructor() {
    this.supabase = createClient(this.SUPABASE_URL, this.SUPABASE_ANON_KEY);
  }

  // Create
  createItem(item: Item): Observable<Item> {
    return from(
      this.supabase
        .from('items')
        .insert([item])
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return data as Item;
        })
    );
  }

  // Read All
  getItems(): Observable<Item[]> {
    return from(
      this.supabase
        .from('items')
        .select('*')
        .order('id', { ascending: false })
        .then(({ data, error }) => {
          if (error) throw error;
          return data as Item[];
        })
    );
  }

  // Read One
  getItem(id: number): Observable<Item> {
    return from(
      this.supabase
        .from('items')
        .select('*')
        .eq('id', id)
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return data as Item;
        })
    );
  }

  // Update
  updateItem(id: number, item: Partial<Item>): Observable<Item> {
    return from(
      this.supabase
        .from('items')
        .update(item)
        .eq('id', id)
        .select()
        .single()
        .then(({ data, error }) => {
          if (error) throw error;
          return data as Item;
        })
    );
  }

  // Delete
  deleteItem(id: number): Observable<void> {
    return from(
      this.supabase
        .from('items')
        .delete()
        .eq('id', id)
        .then(({ error }) => {
          if (error) throw error;
        })
    );
  }
}

