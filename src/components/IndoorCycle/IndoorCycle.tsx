import { Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { useState } from "react";
import NavBar from "../Navbar/Navbar";
//import { useCurrentUser } from "../../hooks/useCurrentUser";
import { PlaylistItemsTypes, PlaylistType } from "../../types/PlaylistType";
import { CreatePlaylistModal } from "./CreatePlaylistModal";
import { useFetchPlaylist } from "../../hooks/useFetchPlaylist";
import { AddSongModal } from "./AddSongModal";
import { ArtistSearchModal } from "../ArtistSearchModal";
import { ArtistType } from "../../types/ArtistType";
import { DisplayArtist } from "../DisplayArtist";
import { useFetchPlaylistItems } from "../../hooks/useFetchPlaylistItems";

const logout = () => {
  //setToken("");
  window.localStorage.removeItem("token");
};

/*function useIndoorCycle() {
  const { data } = useCurrentUser();
  return { currentUser: data };
}*/

export function IndoorCycle() {
  //const { currentUser } = useIndoorCycle();
  const [activePlaylist, setActivePlaylist] = useState<PlaylistType>();
  const [recommendedSongs, setRecommendedSongs] =
    useState<PlaylistItemsTypes>();
  const [fetchPlaylist] = useFetchPlaylist();
  const [artists, setArtists] = useState<ArtistType>();
  const [fetchPlaylistItems] = useFetchPlaylistItems();

  async function handleCreateNewPlaylist(playlistId: string) {
    const response = await fetchPlaylist(playlistId);
    setActivePlaylist(response);
  }

  async function handleOnAdd() {
    if (activePlaylist) {
      const response = await fetchPlaylistItems(activePlaylist.id);
      setRecommendedSongs(response);
      console.log("handle on add: " + response.items[0].track.name);
    }
  }

  function handleOnSearch(data: ArtistType) {
    setArtists(data);
  }

  return (
    <>
      <NavBar logout={logout} />
      {!activePlaylist && (
        <>
          <Flex paddingTop="20rem" justifyContent="center">
            Click a button below to create a new playlist or edit an existing
            one:
          </Flex>
          <Flex margin="5rem" gap="5rem" justifyContent="center">
            <CreatePlaylistModal onCreate={handleCreateNewPlaylist} />
            <Button width="15rem">Edit an existing playlist</Button>
          </Flex>
        </>
      )}
      {activePlaylist && (
        <Flex
          direction="column"
          paddingTop="8rem"
          gap="4rem"
          alignItems="center"
        >
          <Heading>{activePlaylist.name}</Heading>

          {artists && <DisplayArtist artists={artists.artists} />}

          <Stack>
            <ArtistSearchModal onSearch={handleOnSearch} />
            {artists && (
              <AddSongModal
                onAdd={handleOnAdd}
                playlistId={activePlaylist.id}
                seed_artists={artists.artists.items[0].id}
                theme_type={"artist"}
              />
            )}
          </Stack>
          {recommendedSongs &&
            recommendedSongs.items.map((item, index) => {
              return (
                <Flex color="white" key={index}>
                  Song {index + 1}: {item.track.name}
                </Flex>
              );
            })}
        </Flex>
      )}
    </>
  );
}
