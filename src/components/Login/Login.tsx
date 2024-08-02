import { Flex, Heading, Link } from "@chakra-ui/react";

const CLIENT_ID = "083e038070e849ce9421b9cb4ff8d866";
//const CLIENT_SECRET = "d7123cefbc4b4494bd737b9c6506754b";
const REDIRECT_URL = "http://localhost:5173/callback";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";
const SCOPE =
  "user-read-private user-read-email playlist-modify-private playlist-modify-public";

export function Login() {
  return (
    <Flex direction="column" gap="3rem" alignItems="center" paddingTop="15rem">
      <Heading>Welcome to the Best Workout Ever Playlist Creator!</Heading>
      <Flex>Click the button below to login to Spotify and get started.</Flex>
      <Link
        href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`}
      >
        <Flex
          backgroundColor="#6f4985"
          width="fit-content"
          p="1rem"
          borderRadius="8px"
          fontSize="1.25rem"
        >
          Login to Spotify
        </Flex>
      </Link>
    </Flex>
  );
}
