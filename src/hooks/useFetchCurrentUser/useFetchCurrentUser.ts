import { useAsync } from "../useAsync";
import { UserType } from "../../types/UserType";

async function fetchCurrentUser(headers: Headers): Promise<UserType> {
  const response = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers,
  });
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const result = await response.json();
  return result;
}

export function useFetchCurrentUser() {
  return useAsync<[], UserType>(fetchCurrentUser);
}
