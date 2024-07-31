import { Button, Flex, Image, Input, Stack } from "@chakra-ui/react";
import { useState } from "react";
import NavBar from "../Navbar/Navbar";
import { SubmitHandler, useForm } from "react-hook-form";

type ArtistType = {
  artists: {
    href: string;
    items: ArtistItemsType[];
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
  };
};

type ArtistItemsType = {
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  genres: string[];
  href: string;
  id: string;
  images: { url: string; height: number; width: number }[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

type Inputs = {
  searchKey: string;
};

async function searchArtists(searchKey: string, token: string | null) {
  try {
    const response = await fetch(
      "https://api.spotify.com/v1/search?" +
        new URLSearchParams({ q: searchKey, type: "artist" }).toString(),
      { method: "GET", headers: { Authorization: `Bearer ${token}` } }
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log("Error with searching for the artists");
  }
}

const logout = () => {
  //setToken("");
  window.localStorage.removeItem("token");
};

export function IndoorCycle() {
  const form = useForm<Inputs>();
  const [artists, setArtists] = useState<ArtistType>();

  const token = window.localStorage.getItem("token");
  console.log(token);

  const handleSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await searchArtists(data.searchKey, token);
    console.log(response);
    setArtists(response);
  };

  return (
    <Flex direction="column">
      <NavBar logout={logout} />
      <Flex justifyContent="center" paddingTop="8rem">
        Enter the playlist theme and the BPM requirements for each song below:
      </Flex>
      <Flex
        direction="column"
        gap="3rem"
        paddingTop="15rem"
        alignItems="center"
      >
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Stack>
            <Input defaultValue="" {...form.register("searchKey")} />
            <Button backgroundColor="#6f4985" color="white" type="submit">
              Search
            </Button>
          </Stack>
        </form>

        {artists &&
          artists.artists.items.map((artist) => (
            <Flex key={artist.id}>
              {artist.images.length ? (
                <Image src={artist.images[0].url} alt="" />
              ) : (
                <div>No Image</div>
              )}
              {artist.name}
            </Flex>
          ))}
      </Flex>
    </Flex>
  );
}
