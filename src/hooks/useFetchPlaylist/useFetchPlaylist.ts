import { useAsync } from "../useAsync";
import { PlaylistType } from "../../types/PlaylistType";

async function fetchPlaylist(
  headers: Headers,
  playlistId: string
): Promise<PlaylistType> {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    {
      method: "GET",
      headers,
    }
  );
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const result = await response.json();
  return result;
}

export function useFetchPlaylist() {
  return useAsync<[string], PlaylistType>(fetchPlaylist);
}
