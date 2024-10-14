export interface INewReleasesResponse {
  albums: {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: IAlbum[];
  };
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

export interface IFeaturedPlaylistsResponse {
  playlists: {
    items: IPlaylist[];
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
  images: IImage[];
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

export interface IImage {
  url: string;
  height: number;
  width: number;
}

export interface IArtist {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
