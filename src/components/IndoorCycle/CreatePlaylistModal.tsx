import {
  Button,
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
import { CreatePlaylistType } from "../../types/PlaylistType";
import { useCreatePlaylist } from "../../hooks/useCreatePlaylist";
import { useCallback } from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";

export interface CreatePlaylistModal {
  onCreate: (playlistId: string) => void;
}

function useCreatePlaylistModal(props: CreatePlaylistModal) {
  const currentUserResponse = useCurrentUser();

  const { register, handleSubmit, formState } = useForm<CreatePlaylistType>({
    defaultValues: {
      name: "",
      description:
        "Indoor Cycle Class Playlist made from the Best Workout Ever Playlist Creator",
      public: true,
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [createPlaylist, createPlaylistResponse] = useCreatePlaylist();

  const onSubmit = useCallback(
    async (data: CreatePlaylistType) => {
      try {
        const requestData = {
          ...data,
          name: data.name,
        };

        if (currentUserResponse.data) {
          const response = await createPlaylist(
            currentUserResponse.data.id,
            requestData
          );
          await props.onCreate(response.id);
          onClose();
        }
      } catch {
        onClose();
      }
    },
    [createPlaylist, currentUserResponse.data, onClose]
  );

  return {
    createPlaylistResponse,
    formState,
    isOpen,
    onClose,
    onOpen,
    onSubmit,
    handleSubmit,
    register,
  };
}

export function CreatePlaylistModal(props: CreatePlaylistModal) {
  const {
    createPlaylistResponse,
    formState,
    isOpen,
    onClose,
    onOpen,
    onSubmit,
    handleSubmit,
    register,
  } = useCreatePlaylistModal(props);

  return (
    <>
      <Button width="15rem" onClick={onOpen}>
        Create a new playlist
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} colorScheme="purple">
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader color="#6f4985">Create a New Playlist</ModalHeader>
            <ModalCloseButton color="#6f4985" />
            <ModalBody>
              <Stack spacing={0.5}>
                <FormControl isInvalid={!!formState.errors.name}>
                  <FormLabel color="#6f4985">Playlist Name</FormLabel>
                  <Input
                    color="#6f4985"
                    {...register("name")}
                    isRequired={true}
                    isDisabled={createPlaylistResponse.isLoading}
                  />
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button color="#6f4985" variant="ghost" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button backgroundColor="#6f4985" color="white" type="submit">
                Create
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
