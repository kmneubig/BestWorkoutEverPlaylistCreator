import { Flex, Image, Text } from "@chakra-ui/react";

export default function Logo() {
  return (
    <Flex gap="1rem">
      <Image src="../../../favicon.ico" boxSize="30px" />
      <Text fontSize="lg" fontWeight="bold">
        Best Workout EVER Playlist Creator
      </Text>
    </Flex>
  );
}
