export type ArtistType = {
  artists: {
    href: string;
    items: ArtistItemsType[];
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
  };
};

export type ArtistItemsType = {
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  genres: string[];
  href: string;
  id: string;
  images: Images[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

export type Inputs = {
  searchKey: string;
};

export type Images = {
  url: string;
  height: number;
  width: number;
};
