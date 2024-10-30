import {CommonModule} from '@angular/common';
import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {IonInput, IonLabel, IonItem, IonButton} from '@ionic/angular/standalone';
import {LogService} from '../../../services/log.service';
import {ReactionService} from '../../../services/reaction.service';
import {UserService} from '../../../services/user.service';
import {Reactions} from '../../../util/enums/reactions.enum';
import {AbstractFormComponent} from '../../components/abstract.form.component';
import {ReactionUploaderComponent} from '../../components/reaction-uploader/reaction-uploader.component';
import {AbstractAuthPage} from '../abstract.auth.page';

interface IValue {
  displayName: string;

  reactions: GenericObject<string>
}

const isEmpty = (value?: string) => !value && value === '';

@Component({
  imports: [
    CommonModule,
    IonInput,
    IonLabel,
    IonItem,
    IonButton,
    FormsModule,
    AbstractAuthPage,
    ReactionUploaderComponent
  ],
  standalone: true,
  templateUrl: './profile-setup.page.pug',
})
export class ProfileSetupPage extends AbstractFormComponent<IValue> {
  public readonly heading = 'Setup Your Profile.';

  public readonly description = 'Setup your profile to start capturing the world.';

  public readonly reactions: GenericObject<string> = {
    [Reactions.LIKE]: '😍',

    [Reactions.DISLIKE]: '🤮',

    [Reactions.FIRE]: '🔥',

    [Reactions.DEAD]: '💀'
  }

  public toggled = false;

  readonly #userSvc = inject(UserService);

  readonly #reactionSvc = inject(ReactionService);

  readonly #router = inject(Router);

  public constructor() {
    super()

    this.busy = false;

    this.value = {
      displayName: '',

      reactions: {
        [Reactions.LIKE]: '',

        [Reactions.DISLIKE]: '',

        [Reactions.FIRE]: '',

        [Reactions.DEAD]: ''
      }
    }
  }

  public async onSubmit(): Promise<void> {
    this.busy = true;

    const uploadedUrls = await Promise.all(
      Object.entries(this.value.reactions).map(async ([reactionKey, base64String]) => {
        if (isEmpty(base64String)) return {[reactionKey]: null}

        const fileName = `${reactionKey}.png`;
        const imageUrl = await this.#reactionSvc.uploadImage(base64String, fileName);
        return {[reactionKey]: imageUrl};
      })
    );

    const reactionUrls = uploadedUrls.reduce((acc, curr) => {
      return {...acc, ...curr};
    }, {});

    try {
      await Promise.all([
        await this.#reactionSvc.upsert(reactionUrls, this.#userSvc.user?.id),
        await this.#userSvc.finialiseProfileSetup(this.value.displayName)
      ])

      this.busy = false;
      await this.#router.navigate(['/tabs/home'], {replaceUrl: true})
    } catch (error) {
      this.busy = false;
      LogService.error('Error setting up profile', 'profile-setup.page.onSubmit', error);
    }
  }
}