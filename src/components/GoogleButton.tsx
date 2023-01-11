import { Button, ButtonProps, Image } from '@chakra-ui/react';
import google from 'assets/png/google.png';

const GoogleButton: React.FC<ButtonProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <Button {...rest}>
      <Image
        src={google}
        alt='Google'
        w={8} h={8}
        mr={2}
      />
      {children}
    </Button>
  );
};

export { GoogleButton };