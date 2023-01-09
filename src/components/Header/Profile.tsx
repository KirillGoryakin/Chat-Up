import { Avatar, Flex, Text } from "@chakra-ui/react";

const Profile = () => {
  const user = false;
  
  return user ? (
    <Flex
      alignItems='center'
      gap={2}
      ml={6}
    >
      <Text
        fontWeight={500}
        color='white'
      >
        Name Name
      </Text>

      <Avatar
        name='Name Name'
        src='https://bit.ly/dan-abramov'
      />
    </Flex>
  ): null;
};

export { Profile };