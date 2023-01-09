import { Box, Flex, Text } from "@chakra-ui/react";

type Props = {
  message: {
    text: string;
    isOur: boolean;
  };
};

const Message: React.FC<Props> = ({ message }) => {
  return (
    <Flex
      justifyContent={message.isOur ? 'flex-end' : 'flex-start'}
      py={1}
    >
      <Box
        background={message.isOur ? 'green.500' : 'purple.500'}
        borderRadius={15}
        px={2} py={1}
      >
        <Text
          textAlign={message.isOur ? 'right' : 'left'}
        >
          {message.text}
        </Text>
      </Box>
    </Flex>
  )
}

export { Message };