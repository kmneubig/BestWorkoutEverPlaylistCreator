import { Grid, GridItem } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

export const GridStyled = styled(Grid)`
  p: 1rem;
  gap: 2rem;
  max-width: 45%;
  min-width: 45%;
`;

export const GridItm = styled(GridItem)`
  height: 7rem;
  border-radius: 8px;
  background-color: white;
  color: #6f4985;
  &:hover {
    border: solid #6f4985;
  }
`;

export const NavLinkItem = styled(NavLink)`
  color: #6f4985;
  &:hover {
    color: #6f4985;
    text-decoration: none;
  }
`;
