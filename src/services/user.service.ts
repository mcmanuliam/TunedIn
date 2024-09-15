import {inject, Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import type {IUserProfile} from "../models/user";
import {TableNames} from "../util/enums/table-names.enum";
import {LogService} from "./log.service";
import {SupabaseService} from "./supabase.service";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly #supaSvc = inject(SupabaseService);

  #userSubject = new BehaviorSubject<IUserProfile | null>(null);

  public user$ = this.#userSubject.asObservable();

  public set user(user: IUserProfile | null) {
    this.#userSubject.next(user);
  }

  public get user(): IUserProfile | null {
    return this.#userSubject.getValue();
  }

  public get full_name(): string | null {
    const user = this.#userSubject.getValue();
    return user ? `${user.first_name} ${user.second_name}` : null;
  }

  public empty(): void {
    this.#userSubject.next(null);
  }

  public async get(userId?: string): Promise<IUserProfile | null> {
    const {data, error} = await this.#supaSvc.client
      .from(TableNames.PROFILES)
      .select('*')
      .eq('id', userId ?? this.user?.id)
      .single();

    if (error) {
      LogService.error('Error fetching user profile:', 'user.service.get', error);
      return null;
    }

    this.user = data as IUserProfile;
    return this.user;
  }

  public async update(opts: GenericObject<any>, userId?: string): Promise<IUserProfile | null> {
    const {error} = await this.#supaSvc.client
      .from(TableNames.PROFILES)
      .update(opts)
      .eq('id', userId ?? this.user?.id)
      .single();

    if (error) {
      LogService.error('Error updating user profile:', 'user.service.update', error);
      return null;
    }

    this.user = {...this.user, ...opts} as IUserProfile;
    return this.user;
  }

  public async finialiseProfileSetup(displayName: string): Promise<IUserProfile | null> {
    return await this.update({
      display_name: displayName,
      profile_setup: new Date(),
    })
  }
}