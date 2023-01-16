import { Avatar, Flex, Text } from '@chakra-ui/react';
import { Chat } from 'appTypes';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { setCurrentChat } from 'store/AuthSlice';

type Props = {
  chat: Chat;
  mobile?: boolean;
  onClick?: () => void;
};

const ChatItem: React.FC<Props> = ({ chat, mobile, onClick }) => {
  const dispatch = useAppDispatch();
  const currentChat = useAppSelector(state => state.auth.currentChat);
  const isSelected = currentChat?.id === chat.id;
  
  const selectedBgColor = mobile ? '#ddd' : '#545454';
  const hoverBgColor = mobile ? '#999' : '#595959';

  const handleClick = () => {
    dispatch(setCurrentChat(chat));

    if (onClick) onClick();
  }
  
  return (
    <Flex
      onClick={handleClick}
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      layout
      py={2} pl={5}
      w='100%'
      borderBottom='2px solid #282626'
      alignItems='center'
      cursor='pointer'
      background={isSelected ? selectedBgColor : 'none'}
      _hover={{ background: hoverBgColor }}
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
        color={mobile ? 'dark.800' : 'white'}
      >
        {chat.displayName}
      </Text>
    </Flex>
  );
};

export { ChatItem };