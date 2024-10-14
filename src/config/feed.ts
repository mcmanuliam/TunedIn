interface IFeedLayout {
  /* Recent Releases pulled from Spotify */
  recentReleases: boolean,

  /* Top Playlists pulled from Spotify */
  topPlaylists: boolean,
}

interface IFeedConfig {
  /* Height from the top where you can trigger one tap auto scroll */
  scrollTop: number;

  layout: IFeedLayout
}

export const feedConfig: IFeedConfig = {
  layout: {
    recentReleases: true,

    topPlaylists: true,
  },

  scrollTop: 200,
}
