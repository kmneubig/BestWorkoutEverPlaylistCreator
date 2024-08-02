import { useEffect, useState } from "react";

export function useGetToken() {
  const [token, setToken] = useState<string | null>("");
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    const accessToken = hash
      .substring(1)
      .split("&")
      .find((elem) => elem.startsWith("access_token"));

    if (!token && accessToken && hash) {
      token = accessToken.split("=")[1];
      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  return token;
}
