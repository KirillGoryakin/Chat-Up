import { Avatar, Flex, Text } from '@chakra-ui/react';
import { useAppSelector } from 'hooks/reduxHooks';

type Props = {
  hideText?: boolean;
  reverse?: boolean;
  textColor?: string;
};

const Profile: React.FC<Props> = ({
  hideText,
  reverse,
  textColor = 'white'
}) => {
  const user = useAppSelector(store => store.auth.user);
  
  if (user){
    const { displayName, photoURL, email } = user;
    
    return (
      <Flex
        alignItems='center'
        gap={2} ml={6}
        flexDirection={reverse ? 'row-reverse' : 'unset'}
      >
        {!hideText &&
          <Text
            fontWeight={500}
            color={textColor}
          >
            {displayName ? displayName : email}
          </Text>
        }

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