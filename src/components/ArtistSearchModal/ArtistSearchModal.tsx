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
import { useCallback } from "react";
import { useForm } from "react-hook-form";

import { ArtistType, Inputs } from "../../types/ArtistType";
import { useSearchForArtist } from "../../hooks/useSearchForArtist";

export interface ArtistSearchModalType {
  onSearch: (artists: ArtistType) => void;
}

function useArtistSearchModal(props: ArtistSearchModalType) {
  const { register, handleSubmit, formState } = useForm<Inputs>({
    defaultValues: {
      searchKey: "",
    },
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [searchForArtist, searchForArtistResponse] = useSearchForArtist();

  const onSubmit = useCallback(
    async (data: Inputs) => {
      try {
        const response = await searchForArtist(data.searchKey);
        await props.onSearch(response);
        onClose();
      } catch {
        onClose();
      }
    },
    [searchForArtist, searchForArtistResponse.data, onClose]
  );

  return {
    searchForArtistResponse,
    formState,
    isOpen,
    onClose,
    onOpen,
    onSubmit,
    handleSubmit,
    register,
  };
}

export function ArtistSearchModal(props: ArtistSearchModalType) {
  const {
    searchForArtistResponse,
    formState,
    isOpen,
    onClose,
    onOpen,
    onSubmit,
    handleSubmit,
    register,
  } = useArtistSearchModal(props);

  return (
    <>
      <Button
        backgroundColor="#6f4985"
        color="white"
        width="15rem"
        onClick={onOpen}
      >
        Search for Artist
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} colorScheme="purple">
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader color="#6f4985">Search for an artist</ModalHeader>
            <ModalCloseButton color="#6f4985" />
            <ModalBody>
              <Stack spacing={0.5}>
                <FormControl isInvalid={!!formState.errors.searchKey}>
                  <FormLabel color="#6f4985">
                    Enter the artist to search for
                  </FormLabel>
                  <Input
                    color="#6f4985"
                    {...register("searchKey")}
                    isRequired={true}
                    isDisabled={searchForArtistResponse.isLoading}
                  />
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button color="#6f4985" variant="ghost" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button backgroundColor="#6f4985" color="white" type="submit">
                Search
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
