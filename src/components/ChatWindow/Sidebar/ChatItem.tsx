import { Avatar, Flex, Text } from "@chakra-ui/react";
import { Chat } from "appTypes";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { setCurrentChat } from "store/AuthSlice";

type Props = {
  chat: Chat;
};

const ChatItem: React.FC<Props> = ({ chat }) => {
  const dispatch = useAppDispatch();
  const currentChat = useAppSelector(state => state.auth.currentChat);
  
  return (
    <Flex
      onClick={() => dispatch(setCurrentChat(chat))}
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      layout
      py={2} pl={5}
      w='100%'
      borderBottom='2px solid #282626'
      alignItems='center'
      cursor='pointer'
      background={currentChat?.id === chat.id ? '#545454' : 'none'}
      _hover={{ background: '#595959' }}
      transition='0.1s background ease-in-out'
      userSelect='none'
    >
      <Avatar
        name={chat.displayName}
        src={chat.photoUrl}
        mr={4}
      />

      <Text
        fontSize='xl'
        fontWeight={500}
        color='white'
      >
        {chat.displayName}
      </Text>
    </Flex>
  );
};

export { ChatItem };