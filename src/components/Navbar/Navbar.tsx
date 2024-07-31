import { Button, Flex } from "@chakra-ui/react";

import Logo from "./Logo";
import MenuItem from "./MenuItem";

type NavbarType = { logout: () => void };

function NavBar(props: NavbarType) {
  return (
    <Flex
      as="nav"
      direction="row"
      paddingLeft="2rem"
      paddingRight="2rem"
      alignItems="center"
      justifyContent="space-between"
      height="60px"
      backgroundColor="white"
      color="#6f4985"
    >
      <Logo />
      <Flex gap="3rem" alignItems="center">
        <MenuItem to="/">Home</MenuItem>
        <Button backgroundColor="#6f4985" color="white" onClick={props.logout}>
          Logout
        </Button>
      </Flex>
    </Flex>
  );
}

export default NavBar;
