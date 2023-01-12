import { Flex } from "@chakra-ui/react";
import { Messages } from "./Messages";
import { MessageForm } from "./MessageForm";
import { TopBar } from "./TopBar";

const Chat = () => {
  return (
    <Flex
      flexDirection='column'
      justifyContent='space-between'
      w='100%'
    >
      <TopBar />
      
      <Messages />

      <MessageForm />
    </Flex>
  )
}

export { Chat };