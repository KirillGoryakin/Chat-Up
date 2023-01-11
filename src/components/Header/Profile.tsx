import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useAppSelector } from "hooks/reduxHooks";

const Profile = () => {
  const user = useAppSelector(store => store.auth.user);
  
  if (user){
    const { displayName, photoURL, email } = user;
    
    return (
      <Flex
        alignItems='center'
        gap={2}
        ml={6}
      >
        <Text
          fontWeight={500}
          color='white'
        >
          {displayName ? displayName : email}
        </Text>

        <Avatar
          name={displayName as string}
          src={photoURL as string}
        />
      </Flex>
    );
  }

  return null;
};

export { Profile };