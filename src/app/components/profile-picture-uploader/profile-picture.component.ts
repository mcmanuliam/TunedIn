import {CommonModule} from '@angular/common';
import type {ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ChangeDetectorRef, Component, Input, ViewChild, inject} from '@angular/core';
import {IonButton, IonIcon, IonModal, IonSkeletonText} from '@ionic/angular/standalone';
import type {Subscription} from 'rxjs';
import {LogService} from '../../../services/log.service';
import {SupabaseService} from '../../../services/providers/supabase.service';
import {UserService} from '../../../services/user.service';
import {BucketNames} from '../../../util/enums/bucket-names.enum';
import {ProfilePictureService} from './profile-picture.service';

@Component({
  imports: [
    CommonModule,
    IonButton,
    IonIcon,
    IonModal,
    IonSkeletonText
  ],
  selector: 'profile-picture',
  standalone: true,
  styleUrls: ['./profile-picture.component.scss'],
  templateUrl: './profile-picture.component.pug',
})
export class ProfilePictureComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput')
  public fileInput!: ElementRef<HTMLInputElement>;

  @ViewChild('imageElement')
  public imageElement!: ElementRef<HTMLImageElement>;

  @Input()
  public editable = false;

  public busy = false;

  public profilePictureUrl: string | null = null;

  public sub$?: Subscription;

  readonly #userSvc = inject(UserService);

  readonly #supaSvc = inject(SupabaseService);

  readonly #cdr = inject(ChangeDetectorRef);

  readonly #profilePic = inject(ProfilePictureService);

  public ngOnInit(): void {
    this.busy = true;
    this.#profilePic.profilePictureUrl$.subscribe(url => {
      if (url) {
        this.profilePictureUrl = url
      } else if (this.#userSvc.user?.profile_picture_url) {
        this.profilePictureUrl = this.#userSvc.user?.profile_picture_url;
      }
      this.#cdr.detectChanges();
      this.busy = false;
    });
  }

  public ngOnDestroy(): void {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }

  public triggerFileInput(): void {
    if (!this.editable) return;
    this.fileInput.nativeElement.click();
  }

  public async onFileSelected(event: Event) {
    if (!this.editable) return;

    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    this.busy = true;
    const filename = `${this.#userSvc.user?.id}/avatar-${new Date().getTime()}.jpeg`;

    const {error} = await this.#supaSvc.client.storage
      .from(BucketNames.PROFILES)
      .upload(filename, file);

    if (error) {
      LogService.error(`Error uploading image`, 'profile-picture.component.onFileSelected', error);
      this.busy = false;
      return;
    }

    const {data: urlData} = this.#supaSvc.client.storage
      .from(BucketNames.PROFILES)
      .getPublicUrl(filename);

    await this.#userSvc.update({profile_picture_url: urlData.publicUrl});
    this.#profilePic.updateProfilePicture(`${urlData.publicUrl}?t=${new Date().getTime()}`);

    this.busy = false;
    this.#cdr.detectChanges();
  }
}