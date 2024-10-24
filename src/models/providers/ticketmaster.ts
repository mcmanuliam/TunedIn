export interface IImage {
    /* e.g. "16_9" */
    ratio: string;

    url: string;

    width: number;

    height: number;

    /* Indicates if this is a fallback image */
    fallback: boolean;
}

export interface ICity {
    name: string;
}

export interface IState {
    name: string;

    /* State code (e.g. "FL") */
    stateCode: string;
}

export interface ICountry {
    name: string;

    /* Country code (e.g. "US") */
    countryCode: string;
}

export interface ILocation {
    longitude: string;

    latitude: string;
}

export interface IVenue {
    name: string;

    id: string;

    /* URL to the venue page */
    url: string;

    /* e.g. "en-us" */
    locale: string;

    images: IImage[];

    postalCode: string;

    timezone: string;

    city: ICity;

    state: IState;

    country: ICountry;

    location: ILocation;

    parkingDetail: string;

    accessibleSeatingDetail: string;
}

export interface IEvent {
  name: string;

  id: string;

  url: string;

  images: {
    url: string;

    ratio: string;

    width: number;

    height: number;
  }[];

  dates: {
    start: {
      localDate: string;

      localTime: string;

      dateTime: string;
    }
  };

  _embedded: {
    venues: IVenue[]
  }
}

export interface IEventsResponse {
  _embedded?: {
    events: IEvent[];
  };

  page: {
    size: number;

    totalElements: number;

    totalPages: number;

    number: number;
  };
}