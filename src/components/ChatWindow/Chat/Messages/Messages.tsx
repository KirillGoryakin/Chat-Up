import { Flex } from "@chakra-ui/react";
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { Message } from "./Message";
import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from "firebaseApp";
import { setCurrentMessages } from "store/AuthSlice";
import { Message as MessageType } from "appTypes";

const Messages = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(state => state.auth);
  const user = state.user;
  const chatId = state.currentChat?.id;
  const messages = state.currentMessages;

  useEffect(() => {
    if (!chatId) return;

    const messagesRef = doc(firestore, `/chats/${chatId}/messages/allMessages`);
    const unsub = onSnapshot(messagesRef, messagesSnap => {
      let messages: MessageType[] = messagesSnap.get('messages');

      messages.sort((a, b) => {
        const aDate = a.date.seconds;
        const bDate = b.date.seconds;
        return aDate - bDate;
      });

      dispatch(setCurrentMessages(messages));
    });

    return () => {
      unsub();
    };
  }, [chatId, dispatch]);
  
  return (
    <Flex
      w='100%'
      overflowY='auto'
      flexDirection='column'
      px={5}
      pt={2}
    >
      {user && messages &&
      messages.map(msg => 
        <Message
          key={msg.uid + msg.date.seconds}
          text={msg.text}
          isOur={msg.uid === user.uid}
        />)}
    </Flex>
  )
}

export { Messages };