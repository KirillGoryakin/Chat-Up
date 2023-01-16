import { Avatar, Flex, Text } from '@chakra-ui/react';
import { useAppDispatch } from 'hooks/reduxHooks';
import { createChat } from 'store/authThunks';

type Props = {
  user: {
    uid: string;
    displayName: string;
    photoUrl: string;
  };
  close: () => void;
};

const UserItem: React.FC<Props> = ({ user, close }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(createChat(user));
    close();
  };
  
  return (
    <Flex
      onClick={handleClick}
      py={2} pl={5}
      w='100%'
      borderBottom='2px solid #282626'
      alignItems='center'
      cursor='pointer'
      _hover={{ background: '#595959' }}
      transition='0.1s background ease-in-out'
      userSelect='none'
    >
      <Avatar
        name={user.displayName}
        src={user.photoUrl}
        mr={4}
      />

      <Text
        fontSize='xl'
        fontWeight={500}
        color='dark.800'
      >
        {user.displayName}
      </Text>
    </Flex>
  );
};

export { UserItem };