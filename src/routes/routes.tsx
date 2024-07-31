import { ReactElement, ReactNode } from "react";
import { FaPersonRunning } from "react-icons/fa6";
import { MdDirectionsBike } from "react-icons/md";

import { Home } from "../pages/Home";
import { IndoorCycle } from "../components/IndoorCycle";

export interface AppRoute {
  component: ReactNode;
  isExercise: boolean;
  description: string;
  displayName: string;
  icon: ReactElement;
  path: string;
}

export const routes = [
  {
    component: Home,
    isExercise: false,
    description: "",
    displayName: "Home",
    icon: null,
    path: "/",
  },
  {
    component: Home,
    isExercise: false,
    description: "",
    displayName: "Home",
    icon: null,
    path: "/callback",
  },
  {
    component: IndoorCycle,
    isExercise: true,
    description: "Indoor Cycle Class",
    displayName: "Indoor Cycle Class",
    icon: <MdDirectionsBike color="#6f4985" size={30} />,
    path: "/cycle",
  },
  {
    component: Home,
    isExercise: true,
    description: "Running",
    displayName: "Running",
    icon: <FaPersonRunning color="#6f4985" size={30} />,
    path: "/",
  },
];
