import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// 1. Import the extendTheme function
import { extendTheme } from "@chakra-ui/react";
import { RootLayout } from "./layouts";
import { routes } from "./routes";
import { ErrorBoundary } from "./components/ErrorBoundary";

// 2. Extend the theme to include custom colors, fonts, etc
const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: "linear-gradient(to bottom right, #523a78 10%, #ee696b 74%)",
        opacity: "0.9",
        color: "white",
      },
      // styles for the `a`
      a: {
        color: "teal.500",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorBoundary />}>
      {routes.map(
        (route) =>
          route.component && (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          )
      )}
    </Route>
  )
);

function AppComponent() {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

function App() {
  return <AppComponent />;
}

export default App;
