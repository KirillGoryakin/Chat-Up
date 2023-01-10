import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useAppSelector } from "hooks/reduxHooks";

const Profile = () => {
  const user = useAppSelector(store => store.auth.user);
  
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