import {HttpClient} from '@angular/common/http';
import {Injectable, inject} from '@angular/core';
import {Geolocation} from '@capacitor/geolocation';
import {Storage} from '@ionic/storage-angular';
import {environment} from '../environments/environment';
import {StoreNames} from '../util/enums/store-names.enum';
import {LogService} from './log.service';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  readonly #storage = inject(Storage);

  readonly #http = inject(HttpClient);

  private static readonly API_KEY = environment.googleMapsKey;

  #getLocationData(lat: number, lon: number) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${LocationService.API_KEY}`;
    return this.#http.get(url);
  }

  public async getCurrentCoordinates(): Promise<{ latitude: number; longitude: number }> {
    try {
      const position = await Geolocation.getCurrentPosition();
      const {latitude, longitude} = position.coords;

      await this.#storage.set(StoreNames.CACHED_LOCATION, {latitude, longitude});

      LogService.log('Coordinates fetched', 'LocationService.getCurrentCoordinates', {latitude, longitude});
      return {latitude, longitude};
    } catch (error) {
      LogService.error('Error fetching coordinates', 'LocationService.getCurrentCoordinates', error);
      throw error;
    }
  }

  /* Method to extract city/town from geocode response */
  public async getCityOrTown(lat: number, lon: number): Promise<string | undefined> {
    try {
      const response: any = await this.#getLocationData(lat, lon).toPromise();

      if (response && response.results.length > 0) {
        const addressComponents = response.results[0].address_components;

        // Look for city or locality in the address components
        const cityOrTown = addressComponents.find((component: any) =>
          component.types.includes('locality') || component.types.includes('administrative_area_level_2')
        );

        return cityOrTown ? cityOrTown.long_name : 'Unknown';
      }
    } catch (error) {
      LogService.error('Error fetching City or Town', 'LocationService.getCityOrTown', error);
      return undefined;
    }
    return undefined;
  }
}
