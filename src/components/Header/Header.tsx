import { Flex } from '@chakra-ui/react';
import { Logo } from './Logo';
import { MobileMenu } from './MobileMenu';
import { Profile } from './Profile';
import { SignButtons } from './SignButtons';

const Header = () => {
  const mobile = window.innerWidth <= 768;
  
  return (
    <Flex
      w='100%'
      background='dark.700'
      boxShadow='xl'
      justifyContent='center'
    >
      <Flex
        w='100%'
        maxWidth={1440}
        alignItems='center'
        py={1} px={8}
      >
        <Logo />

        <SignButtons
          gap={4}
          display={mobile ? 'none' : 'flex'}
        />

        <Profile hideText={mobile} />

        <MobileMenu />
      </Flex>
    </Flex>
  );
}

export { Header };