import {local} from "./local";

interface ISpotifyConfig {
  baseUrl: string,

  clientId: string,

  clientSecret: string,

  /* Enable linking spotify account through OAuth */
  oauth: boolean,
}

export const spotifyConfig: ISpotifyConfig = {
  baseUrl: 'https://api.spotify.com/v1',

  clientId: local.spotifyClientId,

  clientSecret: local.spotifyClientSecret,

  oauth: false,
}
