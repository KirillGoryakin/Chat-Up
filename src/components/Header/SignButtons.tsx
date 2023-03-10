import { Button, Flex } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { useNavigate } from 'react-router';
import { logOut } from 'store/authThunks';

const SignButtons: React.FC<any> = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(store => store.auth.user);
  
  return (
    <Flex {...props}>
      {user ? 
        <Button onClick={() => dispatch(logOut())}>
          Log Out
        </Button>
        :
        <>
          <Button onClick={() => navigate('/login')}>
            Sign In
          </Button>
          <Button onClick={() => navigate('/register')}>
            Sign Up
          </Button>
        </>
        }
    </Flex>
  );
};

export { SignButtons };