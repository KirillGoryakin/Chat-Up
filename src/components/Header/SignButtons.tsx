import { Button, Flex } from "@chakra-ui/react";

type Props = {
  [key: string]: any;
};

const SignButtons: React.FC<Props> = (props) => {
  const user = false;
  
  return (
    <Flex {...props}>
      {user ? 
        <Button>
          Log Out
        </Button>
        :
        <>
          <Button>
            Sign In
          </Button>
          <Button>
            Sign Up
          </Button>
        </>
        }
    </Flex>
  );
};

export { SignButtons };