import { Box, Flex } from "@chakra-ui/react";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Window: React.FC<Props> = ({ children }) => {
  return (
    <Box
      maxW={1200}
      w='max-content'
      mx='auto'
      mt={100}
    >
      <Flex
        background='dark.700'
        boxShadow='xl'
        borderRadius={30}
      >
        {children}
      </Flex>
    </Box>
  )
}

export { Window };