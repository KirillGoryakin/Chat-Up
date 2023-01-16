import { Avatar, Flex, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useAppSelector } from 'hooks/reduxHooks';
import { MenuButtonMobile } from '../MenuButtonMobile';

const TopBar = () => {
  const currentChat = useAppSelector(state => state.auth.currentChat);
  
  return (
    <Flex
      w='100%'
      py={2}
      pl={5}
      borderBottom='2px solid #282626'
      alignItems='center'
    >
      <MenuButtonMobile />
      
      {currentChat ?
      <>
        <Avatar
          key={currentChat.photoUrl}
          as={motion.span}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          name={currentChat.displayName}
          src={currentChat.photoUrl}
          mr={4}
        />

        <Text
          key={currentChat.displayName}
          as={motion.p}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          fontSize='xl'
          fontWeight={500}
          color='white'
        >
          {currentChat.displayName}
        </Text>
      </>
      :
      <Text
        fontSize='xl'
        fontWeight={500}
        color='white'
      >
        No chat selected
      </Text>
      }
    </Flex>
  );
}

export { TopBar };