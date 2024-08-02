export type MenuItemType = {
  children: string;
  isLast?: boolean;
  to: string;
};

export type NavbarType = { logout: () => void };
