//import { useCallback, useState } from "react";
//import { useGetAccessToken } from "../useGetAccessToken/useGetAccessToken";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UseAsyncReturn<TArgs extends any[], TData> = [
  (...args: TArgs) => Promise<TData>,
  {
    data: TData;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any | null;
    isLoading: boolean;
  }
];

/*export function useAsync<TArgs extends any[], TData>(
    asyncFn: (headers: Headers, ...args: TArgs) => Promise<TData>,
): UseAsyncReturn<TArgs, TData> {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const getAccessToken = useGetAccessToken();

    const execute = useCallback(
        async (...args: TArgs): Promise<TData> => {
            setIsLoading(true);
            setData(null);
            setError(null);
            try {
                const headers = new Headers();
                const accessToken = await getAccessToken();
            }
        }
    )
}*/
