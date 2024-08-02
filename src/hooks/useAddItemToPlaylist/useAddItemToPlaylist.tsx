import { useAsync } from "../useAsync";

async function addItemToPlaylist(
  headers: Headers,
  playlistId: string,
  track_uris: string[]
): Promise<string> {
  headers.append("Content-Type", "application/json");

  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      body: JSON.stringify(track_uris),
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

export function useAddItemToPlaylist() {
  return useAsync<[string, string[]], string>(addItemToPlaylist);
}
