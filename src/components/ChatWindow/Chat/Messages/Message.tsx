import { Box, Flex, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

type Props = {
  text: string;
  isOur: boolean;
};

const Message: React.FC<Props> = ({ text, isOur }) => {
  return (
    <Flex
      as={motion.div}
      initial={{ x: isOur ? 500 : -500 }}
      animate={{ x: 0 }}
      transitionDuration='0.1s'
      justifyContent={isOur ? 'flex-end' : 'flex-start'}
      py={1}
    >
      <Box
        background={isOur ? 'green.500' : 'purple.500'}
        borderRadius={15}
        px={2} py={1}
        maxW='90%'
      >
        <Text
          textAlign={isOur ? 'right' : 'left'}
        >
          {text}
        </Text>
      </Box>
    </Flex>
  )
}

export { Message };