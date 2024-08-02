import { useAsync } from "../useAsync";
import { SearchedTrackTypes, SongSearchType } from "../../types/PlaylistType";

async function searchForSong(
  headers: Headers,
  songSearch: SongSearchType
): Promise<SearchedTrackTypes> {
  const response = await fetch(
    "https://api.spotify.com/v1/recommendations?" +
      new URLSearchParams({
        limit: "2",
        seed_artists: songSearch.seed_artists,
        target_tempo: songSearch.bpm,
      }).toString(),
    {
      method: "GET",
      headers,
    }
  );
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const result = await response.json();
  console.log("search for song result: " + result);
  return result;
}

export function useSearchForSong() {
  return useAsync<[SongSearchType], SearchedTrackTypes>(searchForSong);
}
