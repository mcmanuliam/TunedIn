import type {AfterViewInit, ElementRef} from '@angular/core';
import {Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild} from '@angular/core';
import type {Swiper} from 'swiper/types';
import {SigninComponent} from './sign-in/sign-in.component';
import {SignupComponent} from './sign-up/sign-up.component';

const enum Conf {
  SLIDE_SPEED = 500,
}

@Component({
  imports: [
    SigninComponent,
    SignupComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-auth',
  standalone: true,
  styleUrls: ['./auth.page.scss'],
  templateUrl: './auth.page.pug',
})
export class AuthPage implements AfterViewInit {
  @ViewChild('swiper')
  private readonly swiperRef?: ElementRef<{swiper: Swiper;}>;

  public ngAfterViewInit() {
    this.swiperRef!.nativeElement.swiper.allowTouchMove = true;
  }

  public swipe(direction: 'next' | 'prev') {
    if (direction === 'next') {
      this.swiperRef?.nativeElement.swiper.slideNext(Conf.SLIDE_SPEED);
      return;
    }
    this.swiperRef?.nativeElement.swiper.slidePrev(Conf.SLIDE_SPEED);
  }
}
