import {SearchFilters} from "../util/enums/search-filter-types.enum";

interface IFilter {
  label: string;

  type: SearchFilters;
}

interface ISearchConfig {
  searchFilters: IFilter[];
}

export const searchConfig: ISearchConfig = {
  searchFilters: [
    {
      label: 'Songs',
      type: SearchFilters.TRACK
    },
    {
      label: 'Artists',
      type: SearchFilters.ARTIST
    },
    {
      label: 'Albums',
      type: SearchFilters.ALBUM
    },
    {
      label: 'Playlists',
      type: SearchFilters.PLAYLIST
    },
  ],
}
