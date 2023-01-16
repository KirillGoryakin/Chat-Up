import { Flex } from '@chakra-ui/react';
import { Messages } from './Messages';
import { MessageForm } from './MessageForm';
import { TopBar } from './TopBar';

const Chat = () => {
  return (
    <Flex
      flexDirection='column'
      w={{ base: '100%', md: 400, xl: 900 }}
    >
      <TopBar />
      
      <Messages />

      <MessageForm />
    </Flex>
  )
}

export { Chat };