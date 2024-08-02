import { useAsync } from "../useAsync";
import { ArtistType } from "../../types/ArtistType";

async function searchForArtist(
  headers: Headers,
  searchKey: string
): Promise<ArtistType> {
  const response = await fetch(
    "https://api.spotify.com/v1/search?" +
      new URLSearchParams({
        q: searchKey,
        type: "artist",
        limit: "1",
      }).toString(),
    { method: "GET", headers }
  );
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const result = await response.json();
  return result;
}

export function useSearchForArtist() {
  return useAsync<[string], ArtistType>(searchForArtist);
}
