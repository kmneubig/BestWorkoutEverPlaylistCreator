import { Link, Text } from "@chakra-ui/react";

type MenuItemType = {
  children: string;
  isLast?: boolean;
  to: string;
};

export default function MenuItem(props: MenuItemType) {
  return (
    <Link href={props.to}>
      <Text display="block">{props.children}</Text>
    </Link>
  );
}
