import { useState } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Text} from '@chakra-ui/react';
import { AddChatModal } from './AddChatModal';

type Props = {
  mobile?: boolean;
};

const AddChat: React.FC<Props> = ({ mobile }) => {
  const [open, setOpen] = useState(false);
  
  return (
    <Box
      w='80%'
      mt='auto'
      pt={15}
    >
      <Button
        onClick={() => setOpen(!open)}
        display='flex'
        alignItems='center'
        size='lg'
        w='100%'
        background={ mobile ? 'dark.800' : 'none' }
        color='white'
        _hover={{
          background: 'dark.600'
        }}
      >
        <AddIcon w={6} h={6} mr={2} />
        <Text fontSize={24}>
          New Chat
        </Text>
      </Button>

      <AddChatModal open={open} setOpen={setOpen} />
    </Box>
  );
};

export { AddChat };