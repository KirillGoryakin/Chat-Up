import { Flex } from '@chakra-ui/react';
import { createContext, useState } from 'react';
import { Chat } from './Chat';
import { Sidebar } from './Sidebar';

type drawerContextType = [boolean, (value: boolean) => void];
export const drawerContext =
  createContext<drawerContextType>([false, (value) => {}]);

const ChatWindow = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <Flex 
      w={{ base: '100%', md: '100%' }}
      h={{ base: '100%', md: 700 }}
    >
      <drawerContext.Provider value={[open, setOpen]}>
        <Sidebar />

        <Chat />
      </drawerContext.Provider>
    </Flex>
  );
}

export { ChatWindow };