import { Flex } from "@chakra-ui/react";
import { Messages } from "./Messages";
import { SendForm } from "./SendForm";
import { TopBar } from "./TopBar";

const Chat = () => {
  return (
    <Flex
      flexDirection='column'
      justifyContent='space-between'
    >
      <TopBar />
      
      <Messages />

      <SendForm />
    </Flex>
  )
}

export { Chat };