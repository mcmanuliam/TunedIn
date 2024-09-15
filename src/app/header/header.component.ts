import {CommonModule} from '@angular/common';
import type {OnInit} from '@angular/core';
import {Component, inject} from '@angular/core';
import {IonHeader, IonToolbar, IonIcon, IonSkeletonText} from '@ionic/angular/standalone';
import {LocationService} from '../../services/location.service';

@Component({
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonIcon,
    IonSkeletonText,
  ],
  selector: 'header',
  standalone: true,
  templateUrl: 'header.component.pug',
})
export class HeaderComponent implements OnInit  {
  public location?: string;

  public loading = true;

  readonly #locationSvc = inject(LocationService);

  public async ngOnInit() {
    const coordinates = await this.#locationSvc.getCurrentCoordinates();
    this.location = await this.#locationSvc.getCityOrTown(coordinates.latitude, coordinates.longitude);
    if (this.location) this.loading = false;
  }
}
