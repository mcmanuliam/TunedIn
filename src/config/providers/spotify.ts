import {local} from "../local";
import type {IBaseProvider} from "./base-provider";

interface ISpotifyConfig extends IBaseProvider {
  /* Region used in API calls */
  region: string,

  /* ID of chart playlist */
  charts: string,
}

export const spotifyConfig: ISpotifyConfig = {
  baseUrl: 'https://api.spotify.com/v1',

  charts: '37i9dQZF1DXcBWIGoYBM5M',

  clientId: local.spotify.client,

  clientSecret: local.spotify.secret,

  region: 'GB',
}
