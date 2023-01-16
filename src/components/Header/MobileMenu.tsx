import { useState } from 'react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Button, Drawer, DrawerBody, DrawerContent, DrawerOverlay, Flex } from '@chakra-ui/react';
import { Profile } from './Profile';
import { SignButtons } from './SignButtons';

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        display={{ sm: 'block', md: 'none' }}
        w={10} h={10}
        p={0} ml={4}
        background='none'
        _hover={{
          background: 'dark.600'
        }}
      >
        <HamburgerIcon w={8} h={8} color='white' />
      </Button>

      <MenuDrawer open={open} setOpen={setOpen} />
    </>
  );
}

type MenuProps = {
  open: boolean;
  setOpen: (valuse: boolean) => void;
};

const MenuDrawer: React.FC<MenuProps> = ({ open, setOpen }) => {
  return (
    <Drawer
      isOpen={open}
      onClose={() => setOpen(false)}
      placement='top'
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody>
          <Flex justifyContent='space-between'>
            <Profile reverse textColor='dark.800'/>

            <SignButtons gap={4} ml='auto' />
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export { MobileMenu };