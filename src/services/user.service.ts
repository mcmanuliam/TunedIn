import {inject, Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import type {userProfile} from "../models/user";
import {SupabaseService} from "./supabase.service";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly #supaSvc = inject(SupabaseService);

  #userSubject = new BehaviorSubject<userProfile | null>(null);

  public user$ = this.#userSubject.asObservable();

  public set user(user: userProfile | null) {
    this.#userSubject.next(user);
  }

  public get user(): userProfile | null {
    return this.#userSubject.getValue();
  }

  public get full_name(): string | null {
    const user = this.#userSubject.getValue();
    return user ? `${user.first_name} ${user.second_name}` : null;
  }

  public empty(): void {
    this.#userSubject.next(null);
  }

  public async fetchUserProfile(userId: string): Promise<userProfile | null> {
    const {data, error} = await this.#supaSvc.client
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('[user.service.fetchUserProfile] Error fetching user profile:', error);
      return null;
    }

    const userProfile = data as userProfile;
    this.user = userProfile;
    return userProfile;
  }
}