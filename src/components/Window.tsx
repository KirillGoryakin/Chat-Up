import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';
import { useLocation } from 'react-router';

type Props = {
  children: React.ReactNode;
};

const Window: React.FC<Props> = ({ children }) => {
  const location = useLocation();

  // Only for Desktop
  const animateProps = window.innerWidth > 768 ? {
    key: location.pathname,
    as: motion.div,
    initial: { y: -500 },
    animate: { y: 0 },
  } : {};
  
  return (
    <Box
      {...animateProps}
      maxW={{ base: '100%', md: 1200 }}
      w={{ base: '100%', md: 'max-content' }}
      h={{ base: window.innerHeight - 56, md: 'auto' }}
      mt={{ base: 0, md: 50 }} mx='auto'
      background='dark.700'
      boxShadow='xl'
      borderRadius={{ base: 0, md: 30 }}
    >
      {children}
    </Box>
  )
}

export { Window };