import { Flex, IconButton, Input } from "@chakra-ui/react";
import sendIcon from 'assets/png/send.png';

const SendForm = () => {
  return (
    <Flex
      py={2}
      px={5}
      gap={3}
    >
      <Input
        placeholder="Message"
        h={14}
        color='white'
        _placeholder={{
          color: 'white'
        }}
        borderColor='dark.600'
        focusBorderColor='white'
      />

      <IconButton
        type='submit'
        variant='ghost'
        w={14} h={14}
        p={2}
        _hover={{
          background: 'dark.600'
        }}
        aria-label='Send'
        icon={<img src={sendIcon} alt='Send' />}
      />
    </Flex>
  )
}

export { SendForm };