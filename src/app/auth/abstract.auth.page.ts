import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import {IonContent} from '@ionic/angular/standalone';

@Component({
  imports: [
    CommonModule,
    IonContent,
  ],
  selector: 'abstract-auth-page',
  standalone: true,
  styleUrls: ['./abstract.auth.page.scss'],
  templateUrl: './abstract.auth.page.pug',
})
export class AbstractAuthPage {
  @Input()
  public heading: string = 'Lorem Ipsum';

  @Input()
  public description: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
}