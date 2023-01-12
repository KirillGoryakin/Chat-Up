import { Flex, IconButton, Input } from "@chakra-ui/react";
import sendIcon from 'assets/png/send.png';
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { useEffect, useState } from "react";
import { sendMessage } from "store/slices/AuthSlice";

type SendFormEvent = {
  target: {
    message: { value: string; };
  };
};

const MessageForm = () => {
  const dispatch = useAppDispatch();
  const currentChat = useAppSelector(state => state.auth.currentChat);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      getAuth(),
      setUser,
      console.log
    );

    return () => {
      unsubscribe();
    }
  }, []);
  
  if (!currentChat) return null;
  
  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    if (!user) return;
    
    const
      { target } = e as typeof e & SendFormEvent,
      message = target.message.value.trim();

    if (message) {
      dispatch(sendMessage(message));
      target.message.value = '';
    }
  }
  
  return (
    <Flex
      as='form'
      onSubmit={handleSubmit}
      py={2}
      px={5}
      gap={3}
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