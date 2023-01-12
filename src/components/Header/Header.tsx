import { Flex } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { Profile } from "./Profile";
import { SignButtons } from "./SignButtons";

const Header = () => {
  return (
    <Flex
      position='fixed'
      w='100%'
      top={0}
      left={0}
      background='dark.700'
      boxShadow='xl'
      justifyContent='center'
      zIndex={9999}
    >
      <Flex
        w='100%'
        maxWidth={1440}
        alignItems='center'
        py={1}
      >
        <Logo />

        <SignButtons
          ml='auto'
          gap={4}
        />

        <Profile />
      </Flex>
    </Flex>
  );
}

export { Header };