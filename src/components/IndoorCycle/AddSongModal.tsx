import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { SongSearchType, TrackType } from "../../types/PlaylistType";
import { useCallback } from "react";
import { useSearchForSong } from "../../hooks/useSearchForSong";
import { useAddItemToPlaylist } from "../../hooks/useAddItemToPlaylist";

export interface AddSongModal {
  onAdd: () => void;
  playlistId: string;
  seed_artists: string;
  theme_type: string;
}

function useAddSongModal(props: AddSongModal) {
  const { register, handleSubmit, formState } = useForm<SongSearchType>({
    defaultValues: {
      song_name: "",
      bpm: "",
      seed_artists: props.seed_artists,
      theme_type: props.theme_type,
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [searchForSongPlaylist, searchForSongPlaylistResponse] =
    useSearchForSong();

  const onSubmit = useCallback(
    async (data: SongSearchType) => {
      try {
        const requestData = {
          ...data,
          bpm: data.bpm,
          seed_artists: props.seed_artists,
        };
        console.log("onsubmit theme: " + props.seed_artists);

        searchForSongPlaylist(requestData);
      } catch {
        onClose();
      }
    },
    [searchForSongPlaylist, onClose, props.seed_artists]
  );

  const [addItemToPlaylist] = useAddItemToPlaylist();
  const handleAddItemToPlaylist = useCallback(
    async (playlistId: string, track: TrackType) => {
      try {
        await addItemToPlaylist(playlistId, [track.uri]);
        await props.onAdd();
        onClose();
      } catch {
        onClose();
      }
    },
    [onClose, addItemToPlaylist, props]
  );

  return {
    handleAddItemToPlaylist,
    searchForSongPlaylistResponse,
    formState,
    isOpen,
    onClose,
    onOpen,
    onSubmit,
    handleSubmit,
    register,
  };
}

export function AddSongModal(props: AddSongModal) {
  const {
    handleAddItemToPlaylist,
    searchForSongPlaylistResponse,
    formState,
    isOpen,
    onClose,
    onOpen,
    onSubmit,
    handleSubmit,
    register,
  } = useAddSongModal(props);

  return (
    <>
      <Button
        backgroundColor="#6f4985"
        color="white"
        width="15rem"
        onClick={onOpen}
      >
        Add Song
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} colorScheme="purple">
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader color="#6f4985">
              Add a song to the playlist
            </ModalHeader>
            <ModalCloseButton color="#6f4985" />
            <ModalBody>
              <Stack spacing={0.5}>
                <FormControl isInvalid={!!formState.errors.bpm}>
                  <FormLabel color="#6f4985">Song BPM</FormLabel>
                  <Input
                    color="#6f4985"
                    {...register("bpm")}
                    isRequired={true}
                    isDisabled={searchForSongPlaylistResponse.isLoading}
                  />
                  {searchForSongPlaylistResponse &&
                    searchForSongPlaylistResponse.data && (
                      <Flex color="#6f4985" direction="column">
                        Select a song to add to the playlist:
                        {searchForSongPlaylistResponse.data.tracks.map(
                          (track) => {
                            return (
                              <Stack key={track.name}>
                                <Button
                                  key={track.name}
                                  color="white"
                                  backgroundColor="#6f4985"
                                  margin="0.5rem"
                                  onClick={() =>
                                    handleAddItemToPlaylist(
                                      props.playlistId,
                                      track
                                    )
                                  }
                                >
                                  {track.name}
                                </Button>
                              </Stack>
                            );
                          }
                        )}
                      </Flex>
                    )}
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button color="#6f4985" variant="ghost" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button backgroundColor="#6f4985" color="white" type="submit">
                Search for Songs
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
