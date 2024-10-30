import type {Type} from "@angular/core";
import {ChartsComponent} from "../../app/components/charts/charts.component";
import {NearbyConcertsComponent} from "../../app/components/concerts/nearby-concerts/nearby-concerts.component";
import {TrendingConcertsComponent} from "../../app/components/concerts/trending-concerts/trending-concerts.component";
import {FeaturedPlaylistsComponent} from "../../app/components/featured-playlists/featured-playlists.component";
import {RecentReleasesComponent} from "../../app/components/recent-releases/recent-releases.component";

export interface IFeedItem {
  enable: boolean,

  /* Component to display for feed item */
  component: Type<any>,

  title: string,

  seeAllHandler?: string,
}

export const feedLayoutConfig: IFeedItem[] = [
  {
    component: RecentReleasesComponent,
    enable: true,
    title: 'Trending',
  },
  {
    component: FeaturedPlaylistsComponent,
    enable: true,
    title: 'Featured Playlists',
  },
  {
    component: TrendingConcertsComponent,
    enable: true,
    title: 'Top Concerts',
  },
  {
    component: NearbyConcertsComponent,
    enable: true,
    title: 'Nearby Concerts',
  },
  {
    component: ChartsComponent,
    enable: true,
    title: 'Todays top 10',
  },
]