import { HamburgerIcon } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';
import { useContext } from 'react';
import { drawerContext } from './ChatWindow';

const MenuButtonMobile = () => {
  const [_, setOpen] = useContext(drawerContext);
  
  return (
    <Button
      onClick={() => setOpen(true)}
      display={{ sm: 'block', md: 'none'}}
      w={10} h={10}
      p={0} mr={4}
      background='none'
      _hover={{
        background: 'dark.600'
      }}
    >
      <HamburgerIcon w={8} h={8} color='white' />
    </Button>
  );
}

export { MenuButtonMobile };