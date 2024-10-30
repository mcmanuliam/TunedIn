import {inject, Injectable} from "@angular/core";
import type {Observable} from "rxjs";
import {BehaviorSubject} from "rxjs";
import type {IReactions} from "../models/reactions";
import {BucketNames} from "../util/enums/bucket-names.enum";
import {TableNames} from "../util/enums/table-names.enum";
import {convertB64ToBlob} from "../util/functions/convert-base64-blob";
import {LogService} from "./log.service";
import {SupabaseService} from "./providers/supabase.service";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root',
})
export class ReactionService {
  public reactions$: Observable<IReactions | null>;

  readonly #supaSvc = inject(SupabaseService);

  readonly #userSvc = inject(UserService);

  #reactionsSubject = new BehaviorSubject<IReactions | null>(null);

  public constructor() {
    this.reactions$ = this.#reactionsSubject.asObservable()
  }

  public set reactions(user: IReactions | null) {
    this.#reactionsSubject.next(user);
  }

  public get reactions(): IReactions | null {
    return this.#reactionsSubject.getValue();
  }

  public async get(userId?: string): Promise<IReactions | null> {
    const {data, error} = await this.#supaSvc.client
      .from(TableNames.REACTIONS)
      .select('*')
      .eq('user', userId ?? this.#userSvc.user?.id)
      .single();

    if (error) {
      LogService.error('Error fetching reactions', 'reaction.service.get', error);
      return null;
    }

    this.reactions = data as IReactions;
    return this.reactions;
  }

  public async update(opts: GenericObject<any>, userId?: string): Promise<IReactions | null> {
    const {error} = await this.#supaSvc.client
      .from(TableNames.REACTIONS)
      .update(opts)
      .eq('user', userId ?? this.#userSvc.user?.id)
      .single();

    if (error) {
      LogService.error('Error updating reactions', 'reaction.service.update', error);
      return null;
    }

    this.reactions = {...this.reactions, ...opts} as IReactions;
    return this.reactions;
  }

  public async insert(opts: GenericObject<any>, userId?: string): Promise<IReactions | null> {
    const {error} = await this.#supaSvc.client
      .from(TableNames.REACTIONS)
      .insert({...opts, user: userId ?? this.#userSvc.user?.id})
      .single();

    if (error) {
      LogService.error('Error inserting reactions', 'reaction.service.update', error);
      return null;
    }

    this.reactions = {...this.reactions, ...opts} as IReactions;
    return this.reactions;
  }

  public async upsert(opts: GenericObject<any>, userId?: string): Promise<IReactions | null> {
    const curUser = userId ?? this.#userSvc.user?.id;

    const data = await this.get();
    if (data) {
      return this.update(opts, curUser);
    } else {
      return this.insert(opts, curUser);
    }
  }


  public async uploadImage(base64String: string, fileName: string): Promise<null | string> {
    const blob = convertB64ToBlob(base64String);
    const {error} = await this.#supaSvc.client.storage
      .from(BucketNames.REACTIONS)
      .upload(`${this.#userSvc.user?.id}/${fileName}`, blob);

    if (error) {
      LogService.error('Error saving to bucket', 'reaction.service.uploadImage', error);
      return null;
    }

    const {data} = this.#supaSvc.client.storage
      .from(BucketNames.REACTIONS)
      .getPublicUrl(`${this.#userSvc.user?.id}/${fileName}`);

    return data.publicUrl;
  }
}