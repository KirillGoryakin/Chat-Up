import { Flex } from "@chakra-ui/react";
import { Chat } from "./Chat";
import { Sidebar } from "./Sidebar";

const ChatWindow = () => {
  return (
    <Flex h={700}>
      <Sidebar />

      <Chat />
    </Flex>
  )
}

export { ChatWindow };