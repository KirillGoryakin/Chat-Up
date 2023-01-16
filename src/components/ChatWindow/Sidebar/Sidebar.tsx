import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex } from '@chakra-ui/react';
import { Chat } from 'appTypes';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { firestore } from 'firebaseApp';
import { useAppDispatch, useAppSelector } from 'hooks/reduxHooks';
import { useEffect, useContext } from 'react';
import { drawerContext } from '../ChatWindow';
import { setChats } from 'store/AuthSlice';
import { AddChat } from './AddChat';
import { ChatItem } from './ChatItem';
import { SidebarHeading } from './SidebarHeading';

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
    <>
      <MobileDrawer chats={chats} />
    
      <Flex
        display={{ base: 'none', md: 'flex' }}
        flexDirection='column'
        alignItems='center'
        borderRight='2px solid #282626'
        minW={300}
        pt={30} pb={15}
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
    </>
  );
}

const MobileDrawer: React.FC<{ chats: Chat[] }> = ({ chats }) => {
  const [open, setOpen] = useContext(drawerContext);
  
  return (
    <Drawer
      isOpen={open}
      onClose={() => setOpen(false)}
      placement='left'
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader pb={0}>
          <SidebarHeading color='drak.800' />
        </DrawerHeader>

        <DrawerBody p={0}>
          <div style={{
            width: '100%',
            overflowY: 'auto',
          }}>
            {chats.map(chat =>
              <ChatItem
                key={chat.id}
                chat={chat}
                mobile
                onClick={() => setOpen(false)}
              />)}
          </div>
        </DrawerBody>

        <DrawerFooter justifyContent='center'>
          <AddChat mobile />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export { Sidebar };