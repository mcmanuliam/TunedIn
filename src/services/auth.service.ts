import {inject, Injectable} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import type {Session, User, WeakPassword} from '@supabase/supabase-js';
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
        await this.#userSvc.fetchUserProfile(user.id),
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
        await this.#userSvc.fetchUserProfile(user.id),
        await this.setTokens(tokens.access_token, tokens.refresh_token)
      ]);
    }
    return data;
  }

  public async signOut(): Promise<void> {
    await Promise.all([
      await this.#supaSvc.client.auth.signOut(),
      await this.clearTokens(),
    ]);
  }

  /* Restores the user session by retrieving tokens from storage and setting the session in Supabase. */
  public async restoreSession() {
    const {accessToken, refreshToken} = await this.getTokens();

    if (accessToken && refreshToken) {
      try {
        const {data, error} = await this.#supaSvc.client.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          if (error.message.includes("Invalid Refresh Token")) {
            console.warn('[auth.service.restoreSession] Refresh token is invalid, redirecting to sign-in');
            await this.clearTokens();
          } else {
            console.error('[auth.service.restoreSession] Session restoration failed:', error);
            throw error;
          }
        } else {
          console.log('[auth.service.restoreSession] Session restored:', data.session);
          await this.setTokens(accessToken, refreshToken)
        }
      } catch (e) {
        console.error('[auth.service.restoreSession] Unexpected error:', e);
      }
    }
  }

  public async getCurrentUser(): Promise<User | null> {
    const userRes = await this.#supaSvc.client.auth.getUser();
    return userRes.data.user;
  }

  public async doesEmailExist(email: string): Promise<boolean> {
    const {data, error} = await this.#supaSvc.client
      .from('auth.users')
      .select('id')
      .eq('email', email);
    if (error) throw error;
    return data && data.length > 0;
  }

  private async getTokens(): Promise<{accessToken: string; refreshToken: string;}> {
    const [accessToken, refreshToken] = await Promise.all([
      await this.#storage.get('access_token'),
      await this.#storage.get('refresh_token')
    ])
    return {accessToken, refreshToken};
  }

  private async setTokens(accessToken: string, refreshToken: string): Promise<void> {
    await Promise.all([
      await this.#storage.set('access_token', accessToken),
      await this.#storage.set('refresh_token', refreshToken)
    ])
  }

  private async clearTokens(): Promise<void> {
    await Promise.all([
      await this.#storage.remove('access_token'),
      await this.#storage.remove('refresh_token')
    ])
  }
}
