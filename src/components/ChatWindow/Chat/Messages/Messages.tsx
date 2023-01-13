import { Flex } from "@chakra-ui/react";
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { Message } from "./Message";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
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
    
    const q = query(collection(firestore, `/chats/${chatId}/messages`), orderBy('date'));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      let messages: MessageType[] = [];
      
      querySnapshot.forEach(doc => {
        const message: MessageType = {
          id: doc.id,
          date: doc.get('date'),
          text: doc.get('text'),
          uid: doc.get('uid'),
        };

        messages.push(message);
      });

      dispatch(setCurrentMessages(messages));
    });

    return () => {
      unsubscribe();
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
          key={msg.id}
          text={msg.text}
          isOur={msg.uid === user.uid}
        />)}
    </Flex>
  )
}

export { Messages };