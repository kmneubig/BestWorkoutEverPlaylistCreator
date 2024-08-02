/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";
//import { useGetAccessToken } from "../useGetAccessToken/useGetAccessToken";

export type UseAsyncReturn<TArgs extends any[], TData> = [
  (...args: TArgs) => Promise<TData>,
  {
    data: TData;
    error: any | null;
    isLoading: boolean;
  }
];

export function useAsync<TArgs extends any[], TData>(
  asyncFn: (headers: Headers, ...args: TArgs) => Promise<TData>
): UseAsyncReturn<TArgs, TData> {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //const getAccessToken = useGetAccessToken();

  const execute = useCallback(
    async (...args: TArgs): Promise<TData> => {
      setIsLoading(true);
      setData(null);
      setError(null);
      try {
        const headers = new Headers();
        const accessToken = window.localStorage.getItem("token");
        //const accessToken = await getAccessToken();
        headers.append("Authorization", `Bearer ${accessToken}`);

        const response = await asyncFn(headers, ...args);

        setData(response);
        setError(null);
        return response;
      } catch (error) {
        setError(error);
        setData(null);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [asyncFn]
  );

  return [execute, { data, error, isLoading }];
}
