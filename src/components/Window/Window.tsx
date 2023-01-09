import { Flex } from "@chakra-ui/react";
import { Chat } from "./Chat";
import { Sidebar } from "./Sidebar";

const Window = () => {
  return (
    <Flex
      background='dark.700'
      boxShadow='xl'
      borderRadius={30}
      w='100%'
      h={700}
    >
      <Sidebar />

      <Chat />
    </Flex>
  )
}

export { Window };