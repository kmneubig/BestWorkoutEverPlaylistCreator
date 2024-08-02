import { Flex, Image, Text } from "@chakra-ui/react";
import { ArtistType } from "../../types/ArtistType";

export function DisplayArtist(props: ArtistType) {
  return props.artists.items.map((artist) => (
    <Flex
      key={artist.id}
      gap="3rem"
      justifyContent="center"
      alignItems="center"
    >
      <Text>Theme:</Text>
      {artist.images.length ? (
        <Image src={artist.images[0].url} width="10%" height="10%" alt="" />
      ) : (
        <div>No Image</div>
      )}
      <Text>{artist.name} </Text>
    </Flex>
  ));
}
