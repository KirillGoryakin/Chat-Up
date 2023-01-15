import { Flex, IconButton, Input } from "@chakra-ui/react";
import sendIcon from 'assets/png/send.png';
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { sendMessage } from "store/authThunks";

type SendFormEvent = {
  target: {
    message: { value: string; };
  };
};

const MessageForm = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.auth);
  const { currentChat, user } = state;
  
  if (!currentChat) return null;
  
  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    const
      { target } = e as typeof e & SendFormEvent,
      message = target.message.value.trim();
    
    if (!user || !message) return;

    dispatch(sendMessage(message));
    target.message.value = '';
  }
  
  return (
    <Flex
      as='form'
      onSubmit={handleSubmit}
      py={2} px={5}
      mt='auto' gap={3}
    >
      <Input
        placeholder='Message'
        name='message'
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

export { MessageForm };