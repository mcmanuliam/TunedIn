import {inject, Injectable} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import type {Session, User, WeakPassword} from '@supabase/supabase-js';
import {StoreNames} from '../util/store-names.enum';
import {LogService} from './log.service';
import {SupabaseService} from './supabase.service';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #supaSvc = inject(SupabaseService);

  readonly #userSvc = inject(UserService);

  readonly #storage = inject(Storage);

  public async signUp(email: string, password: string): Promise<{
    user: User | null;
    session: Session | null;
  }> {
    const {data, error} = await this.#supaSvc.client
      .auth.signUp({email, password});

    if (error) throw error;

    if (data.session && data.user) {
      const tokens = data.session;
      const user = data.user;
      await Promise.all([
        await this.#userSvc.get(user.id),
        await this.setTokens(tokens.access_token, tokens.refresh_token)
      ]);
    }
    return data;
  }

  public async signIn(email: string, password: string): Promise<{
    user: User;
    session: Session;
    weakPassword?: WeakPassword;
  }> {
    const {data, error} = await this.#supaSvc.client
      .auth.signInWithPassword({email, password});

    if (error) throw error;

    if (data.session && data.user) {
      const tokens = data.session;
      const user = data.user;
      await Promise.all([
        await this.#userSvc.get(user.id),
        await this.setTokens(tokens.access_token, tokens.refresh_token)
      ]);
    }
    return data;
  }

  public async signOut(): Promise<void> {
    await Promise.all([
      await this.#supaSvc.client.auth.signOut(),
      await this.clearTokens(),
      await this.#storage.remove(StoreNames.SESSION_STATE),
    ]);
  }

  /* Restores the user session by retrieving tokens from storage and setting the session in Supabase. */
  public async restoreSession(): Promise<void> {
    const {accessToken, refreshToken} = await this.getTokens();

    if (accessToken && refreshToken) {
      try {
        const {data, error} = await this.#supaSvc.client.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          if (error.message.includes("Invalid Refresh Token")) {
            LogService.warn('Refresh token is invalid, redirecting to sign-in', 'auth.service.restoreSession')
            await this.clearTokens();
          } else {
            LogService.error('Session restoration failed:', 'auth.service.restoreSession', error);
            throw error;
          }
        } else {
          LogService.log('Session restored:', 'auth.service.restoreSession', data.session);
          await this.setTokens(accessToken, refreshToken)
        }
      } catch (error) {
        LogService.error('Unexpected error:', 'auth.service.restoreSession', error);
      }
    }
  }

  public async getCurrentUser(): Promise<User | null> {
    try {
      const sessionRes = await this.#supaSvc.client.auth.getUser();
      await this.#storage.set(StoreNames.SESSION_STATE, sessionRes)
      return sessionRes.data.user;
    } catch (error) {
      LogService.error('Failed to get Current User, fetching from local:', 'auth.service.getCurrentUser', error);
      const localSessionRes = await this.#storage.get(StoreNames.SESSION_STATE)
      return localSessionRes.data.user;
    }
  }

  private async getTokens(): Promise<{accessToken: string; refreshToken: string;}> {
    const [accessToken, refreshToken] = await Promise.all([
      await this.#storage.get(StoreNames.ACCESS_TOKEN),
      await this.#storage.get(StoreNames.REFRESH_TOKEN)
    ])
    return {accessToken, refreshToken};
  }

  private async setTokens(accessToken: string, refreshToken: string): Promise<void> {
    await Promise.all([
      await this.#storage.set(StoreNames.ACCESS_TOKEN, accessToken),
      await this.#storage.set(StoreNames.REFRESH_TOKEN, refreshToken)
    ])
  }

  private async clearTokens(): Promise<void> {
    await Promise.all([
      await this.#storage.remove(StoreNames.ACCESS_TOKEN),
      await this.#storage.remove(StoreNames.REFRESH_TOKEN)
    ])
  }
}
