import { Input } from '@chakra-ui/react';

const FormInput: React.FC<any> = (props) => 
  <Input
    size='lg'
    color='white'
    {...props}
  />;

export { FormInput };