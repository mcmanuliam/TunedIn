export interface ISearchResponse {
  tracks?: {
    href: string;

    items: ITrack[];

    limit: number;

    next: string | null;

    offset: number;

    previous: string | null;

    total: number;
  };

  albums?: {
    href: string;

    items: IAlbum[];

    limit: number;

    next: string | null;

    offset: number;

    previous: string | null;

    total: number;
  };

  artists?: {
    href: string;

    items: IArtist[];

    limit: number;

    next: string | null;

    offset: number;

    previous: string | null;

    total: number;
  };

  playlists?: {
    href: string;

    items: IPlaylist[];

    limit: number;

    next: string | null;

    offset: number;

    previous: string | null;

    total: number;
  };
}

export interface INewReleasesResponse {
  albums: {
    href: string;

    limit: number;

    next: string | null;

    /* Allows for Pagination */
    offset: number;

    previous: string | null;

    total: number;

    items: IAlbum[];
  };
}

export interface IFeaturedPlaylistsResponse {
  playlists: {
    items: IPlaylist[];

    total: number;
  };
}

export interface IPlaylistTracksResponse {
  items: {
    track: ITrack
  }[];
}

export interface IPlaylist {
  id: string;

  name: string;

  description: string;

  images: {
    url: string;
  }[];

  external_urls: {
    spotify: string;
  };

  owner: {
    display_name: string;

    external_urls: {
      spotify: string;
    };
  };

  tracks?: {
    total: number;
  };
}

export interface IAlbum {
  album_type: string;

  total_tracks: number;

  available_markets: string[];

  external_urls: {
    spotify: string;
  };

  href: string;

  id: string;

  images: ISpotifyImage[];

  name: string;

  release_date: string;

  release_date_precision: string;

  restrictions?: {
    reason: string;
  };

  type: string;

  uri: string;

  artists: IArtist[];
}

export interface ITrack {
  id: string;

  name: string;

  duration_ms: number;

  preview_url: string;

  album: {
    id: string;

    name: string;

    images: {
      url: string;

      height: number;

      width: number;
    }[];
  };

  artists: {
    id: string;

    name: string;
  }[];

  external_urls: {
    spotify: string;
  };
}

export interface IArtist {
  id: string;

  name: string;

  genres: string[];

  images: ISpotifyImage[];

  external_urls: {
    spotify: string;
  };

  popularity: number;

  followers: {
    total: number;
  };

  uri: string;
}

export interface ISpotifyImage {
  url: string;

  height: number;

  width: number;
}