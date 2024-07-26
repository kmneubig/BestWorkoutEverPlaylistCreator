//import { useState } from 'react'
import "./App.css";
import { Flex, Input, Text } from "@chakra-ui/react";

function App() {
  //const [count, setCount] = useState(0)

  return (
    <Flex direction="column" height="calc(100vh)" justifyContent="space-around">
      <Flex direction="column">
        <Text as="b" fontSize="3rem" align="center">
          Welcome, Katie!
        </Text>
        <Text fontSize="1.25rem">
          To create the BEST workout playlist EVER, enter the playlist theme,
          the number of songs, and the beats per minute requirement of each
          song.
        </Text>
      </Flex>
      <Input placeholder="Playlist Theme"></Input>
    </Flex>
  );
}

export default App;
