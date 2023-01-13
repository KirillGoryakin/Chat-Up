import { Flex } from "@chakra-ui/react";
import { Messages } from "./Messages";
import { MessageForm } from "./MessageForm";
import { TopBar } from "./TopBar";

const Chat = () => {
  return (
    <Flex
      flexDirection='column'
      w='900px'
    >
      <TopBar />
      
      <Messages />

      <MessageForm />
    </Flex>
  )
}

export { Chat };