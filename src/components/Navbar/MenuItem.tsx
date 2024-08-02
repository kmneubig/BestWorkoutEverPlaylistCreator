import { Link, Text } from "@chakra-ui/react";
import { MenuItemType } from "../../types/NavbarType";

export default function MenuItem(props: MenuItemType) {
  return (
    <Link href={props.to}>
      <Text display="block">{props.children}</Text>
    </Link>
  );
}
