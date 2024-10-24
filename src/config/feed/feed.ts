import {feedLayoutConfig} from "./custom-feed";
import type {IFeedItem} from "./custom-feed";

interface IFeedConfig {
  /* Height from the top where you can trigger one tap auto scroll */
  scrollTop: number;

  layout: IFeedItem[]
}

export const feedConfig: IFeedConfig = {
  layout: feedLayoutConfig,

  scrollTop: 200,
}
