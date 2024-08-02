import { useAsync } from "../useAsync";
import { PlaylistItemsTypes } from "../../types/PlaylistType";

async function fetchPlaylistItems(
  headers: Headers,
  playlist_id: string
): Promise<PlaylistItemsTypes> {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
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

export function useFetchPlaylistItems() {
  return useAsync<[string], PlaylistItemsTypes>(fetchPlaylistItems);
}
