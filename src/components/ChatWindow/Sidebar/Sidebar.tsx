import { Flex } from "@chakra-ui/react";
import { Chat } from "appTypes";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "firebaseApp";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { useEffect } from "react";
import { setChats } from "store/AuthSlice";
import { ChatItem } from "./ChatItem";
import { SidebarHeading } from "./SidebarHeading";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { chats, user } = useAppSelector(state => state.auth);
  
  useEffect(() => {
    const q = query(collection(firestore, 'chats'), where('uids', 'array-contains', user?.uid));
    const unsubscribe = onSnapshot(q, querySnapshot => {
      let chats: Chat[] = [];

      querySnapshot.forEach(doc => {
        const partnerId = doc.get('uids').find((uid: string) => uid !== user?.uid);
        const partnerUser = doc.get('users')[partnerId];

        const chat: Chat = {
          id: doc.id,
          displayName: partnerUser.displayName,
          photoUrl: partnerUser.photoUrl,
        };

        chats.push(chat);
      });

      dispatch(setChats(chats));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch, user]);
  
  return (
    <Flex
      flexDirection='column'
      alignItems='center'
      borderRight='2px solid #282626'
      w={300}
      py={30}
    >
      <SidebarHeading />

      <div style={{
        width: '100%',
        overflowY: 'auto',
      }}>
        {chats.map(chat => <ChatItem key={chat.id} chat={chat} />)}
      </div>
    </Flex>
  )
}

export { Sidebar };