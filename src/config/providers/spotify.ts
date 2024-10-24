import {local} from "../local";
import type {IBaseProvider} from "./base-provider";

interface ISpotifyConfig extends IBaseProvider {
  /* Region used in API calls */
  region: string,
}

export const spotifyConfig: ISpotifyConfig = {
  baseUrl: 'https://api.spotify.com/v1',

  clientId: local.spotify.client,

  clientSecret: local.spotify.secret,

  region: 'UK',
}
