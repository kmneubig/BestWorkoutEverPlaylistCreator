import { createContext, useContext, useEffect } from "react";
import { useFetchCurrentUser } from "../useFetchCurrentUser";
import { UseAsyncReturn } from "../useAsync";
import { UserType } from "../../types/UserType";

export const CurrentUserContext = createContext<
  UseAsyncReturn<[], UserType | null>[1] | null
>(null);

export function useCurrentUserContext() {
  return useContext<UseAsyncReturn<[], UserType | null>[1] | null>(
    CurrentUserContext
  );
}

export function useCurrentUser(): UseAsyncReturn<[], UserType | null>[1] {
  const [fetchCurrentUser, response] = useFetchCurrentUser();

  useEffect(() => {
    fetchCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    ...response,
    data: response.data
      ? {
          display_name: response.data.display_name,
          email: response.data.email,
          id: response.data.id,
          images: response.data.images,
        }
      : null,
  };
}
