import { Flex, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";

import NavBar from "../../components/Navbar/Navbar";
import { Login } from "../../components/Login";
import { routes } from "../../routes";
import { GridItm, GridStyled, NavLinkItem } from "./HomeElements";

export function Home() {
  const [token, setToken] = useState<string | null>("");
  console.log(token);
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

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };

  return (
    <>
      {!token ? (
        <Login />
      ) : (
        <Flex direction="column">
          <NavBar logout={logout} />
          <Flex
            direction="column"
            alignItems="center"
            paddingTop="15rem"
            gap="5rem"
          >
            <Text>First select the type of exercise to build the playlist</Text>
            <GridStyled templateColumns="50% 50%">
              {routes
                .filter((route) => route.isExercise)
                .map((route) => (
                  <GridItm key={route.displayName}>
                    <NavLinkItem
                      to={{
                        pathname: route.path,
                      }}
                      state={token}
                    >
                      <Flex
                        padding="2.5rem"
                        gap="1rem"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Flex>{route.icon}</Flex>
                        <Text fontWeight="800">{route.displayName}</Text>
                      </Flex>
                    </NavLinkItem>
                  </GridItm>
                ))}
            </GridStyled>
          </Flex>
        </Flex>
      )}
    </>
  );
}
