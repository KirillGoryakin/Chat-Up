import { Avatar, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

type Props = {
  chat: {
    name: string;
    avatar: string;
  };
};

const ChatItem: React.FC<Props> = ({ chat }) => {
  return (
    <Flex
      as={motion.div}
      py={2}
      pl={5}
      w='100%'
      borderBottom='2px solid #282626'
      alignItems='center'
      cursor='pointer'
      initial={{ background: 'none' }}
      whileHover={{ background: '#595959' }}
      transition='0.1s background ease-in-out'
    >
      <Avatar
        name={chat.name}
        src={chat.avatar}
        mr={4}
      />

      <Text
        fontSize='xl'
        fontWeight={500}
        color='white'
      >
        {chat.name}
      </Text>
    </Flex>
  );
};

export { ChatItem };