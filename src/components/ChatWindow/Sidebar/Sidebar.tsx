import { Flex } from "@chakra-ui/react";
import { Chat } from "appTypes";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { firestore } from "firebaseApp";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { useEffect } from "react";
import { setChats } from "store/AuthSlice";
import { AddChat } from "./AddChat";
import { ChatItem } from "./ChatItem";
import { SidebarHeading } from "./SidebarHeading";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { chats, user } = useAppSelector(state => state.auth);
  
  useEffect(() => {
    const q = query(
      collection(firestore, 'chats'),
      where('uids', 'array-contains', user?.uid),
      orderBy('lastUpdated', 'desc')
    );
    const unsubscribe = onSnapshot(q, chatsSnap => {
      let fetchedChats: Chat[] = [];

      chatsSnap.forEach(chat => {
        const partnerId = chat.get('uids').find((uid: string) => uid !== user?.uid);
        const partnerUser = chat.get('users')[partnerId];

        fetchedChats.push({
          id: chat.id,
          displayName: partnerUser.displayName,
          photoUrl: partnerUser.photoUrl,
        });
      });

      dispatch(setChats(fetchedChats));
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
      w={300} pt={30} pb={15}
    >
      <SidebarHeading />

      <div style={{
        width: '100%',
        overflowY: 'auto',
      }}>
        {chats.map(chat => <ChatItem key={chat.id} chat={chat} />)}
      </div>

      <AddChat />
    </Flex>
  )
}

export { Sidebar };