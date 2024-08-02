import { Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import NavBar from "../../components/Navbar/Navbar";
import { Login } from "../../components/Login";
import { routes } from "../../routes";
import { GridItm, GridStyled, NavLinkItem } from "./HomeElements";
import { useGetToken } from "../../hooks/useGetToken";
import { useCurrentUser } from "../../hooks/useCurrentUser";

function useHome() {
  const { data } = useCurrentUser();
  return { currentUser: data };
}

export function Home() {
  const { currentUser } = useHome();
  const [token, setToken] = useState<string | null>("");

  const accessToken = useGetToken();
  useEffect(() => {
    setToken(accessToken);
  }, [accessToken]);

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
            <Text>
              Hello, {currentUser?.display_name}! First select the type of
              exercise to build the playlist
            </Text>
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
