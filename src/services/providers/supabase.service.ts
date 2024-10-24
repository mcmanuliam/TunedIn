import {Injectable} from '@angular/core';
import {createClient} from '@supabase/supabase-js';
import type {SupabaseClient} from '@supabase/supabase-js';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  #supa: SupabaseClient

  public constructor() {
    this.#supa = createClient(environment.backendUrl, environment.backendKey)
  }

  public get client(): SupabaseClient {
    return this.#supa;
  }
}
