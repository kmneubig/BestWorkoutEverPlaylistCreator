import { Playlist } from "spotify-web-api-ts/types/types/SpotifyObjects";
import { useAsync } from "../useAsync";

async function fetchUserPlaylists(headers: Headers): Promise<Playlist[]> {
  const response = await fetch("https://api.spotify.com/v1/me/playlists", {
    method: "GET",
    headers,
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const result = await response.json();
  return result;
}

export function useFetchUserPlaylists() {
  return useAsync<[], Playlist[]>(fetchUserPlaylists);
}
