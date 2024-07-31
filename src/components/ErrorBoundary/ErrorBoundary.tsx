import { Heading, Text } from "@chakra-ui/react";
import { useRouteError } from "react-router-dom";

function handleError(error: Error) {
  if (error.message === "Invalid access token") {
    return true;
  }
  return false;
}

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = "An error has occurred.";
  if (error) {
    console.error(error);

    if (error instanceof Error && error.message) {
      errorMessage = `The following error occurred: ${error.message}`;
      if (handleError(error)) {
        return;
      }
    }
  }

  return (
    <>
      <Heading>Error</Heading>
      <Text>
        {errorMessage}
        <br /> Please wait a few seconds and try reloading the page.
      </Text>
    </>
  );
}
