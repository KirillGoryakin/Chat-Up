import { Box, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { useLocation } from "react-router";

type Props = {
  children: React.ReactNode;
};

const Window: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  
  return (
    <Box
      key={location.pathname}
      as={motion.div}
      initial={{ y: -500 }}
      animate={{ y: 0 }}
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