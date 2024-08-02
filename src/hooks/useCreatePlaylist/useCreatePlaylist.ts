import { useAsync } from "../useAsync";
import { CreatePlaylistType, PlaylistType } from "../../types/PlaylistType";

async function createPlaylist(
  headers: Headers,
  userId: string,
  playlist: CreatePlaylistType
): Promise<PlaylistType> {
  headers.append("Content-Type", "application/json");

  const response = await fetch(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    {
      body: JSON.stringify(playlist),
      method: "POST",
      headers,
    }
  );
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const result = await response.json();
  return result;
}

export function useCreatePlaylist() {
  return useAsync<[string, CreatePlaylistType], PlaylistType>(createPlaylist);
}
