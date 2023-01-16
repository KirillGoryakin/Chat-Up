import { Heading } from '@chakra-ui/react';

const SidebarHeading: React.FC<any> = (props) => {
  return (
    <Heading
      size='xl'
      color='white'
      textAlign='center'
      mx='auto' mb={5}
      {...props}
    >
      Chats
    </Heading>
  )
}

export { SidebarHeading };