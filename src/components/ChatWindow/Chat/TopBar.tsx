import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useAppSelector } from "hooks/reduxHooks";

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
      {currentChat ?
      <>
        <Avatar
          name={currentChat.displayName}
          src={currentChat.photoUrl}
          mr={4}
        />

        <Text
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