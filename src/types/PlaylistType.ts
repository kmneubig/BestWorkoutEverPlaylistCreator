import { ArtistType, Images } from "./ArtistType";
import { UserType } from "./UserType";

export type CreatePlaylistType = {
  name: string;
  description: string;
  public?: boolean;
};

export type PlaylistType = {
  description: string;
  id: string;
  images: Images[];
  name: string;
  public: boolean;
  tracks: PlaylistTrackType;
  type: string;
};

export type PlaylistTrackType = {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: [
    {
      added_at: string;
      added_by: UserType;
      is_local: false;
      track: {
        album: {
          album_type: string;
          total_tracks: number;
          available_markets: string[];
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          images: Images[];
          name: string;
          release_date: string;
          release_date_precision: string;
          restrictions: {
            reason: string;
          };
          type: string;
          uri: string;
          artists: ArtistType[];
        };
        artists: ArtistType[];
        available_markets: string[];
        disc_number: number;
        duration_ms: number;
        explicit: false;
        external_ids: {
          isrc: string;
          ean: string;
          upc: string;
        };
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        is_playable: false;
        restrictions: {
          reason: string;
        };
        name: string;
        popularity: number;
        preview_url: string;
        track_number: number;
        type: string;
        uri: string;
        is_local: false;
      };
    }
  ];
};

export type SongSearchType = {
  song_name: string;
  bpm: string;
  seed_artists: string;
  theme_type: string;
};

export type TrackType = {
  artists: ArtistType[];
  duration_ms: number;
  explicit: boolean;
  href: string;
  name: string;
  id: string;
  popularity: number;
  preview_url: string;
  uri: string;
};

export type SearchedTrackTypes = {
  tracks: TrackType[];
};

export type PlaylistItemsTypes = {
  items: { track: TrackType }[];
};
