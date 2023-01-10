import { Button, Flex } from "@chakra-ui/react";
import { useAppSelector } from "hooks/reduxHooks";
import { useNavigate } from "react-router";

type Props = {
  [key: string]: any;
};

const SignButtons: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  const user = useAppSelector(store => store.auth.user);
  
  return (
    <Flex {...props}>
      {user ? 
        <Button>
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