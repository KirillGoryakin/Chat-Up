import { useEffect, useState } from 'react';
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from 'firebaseApp';
import { useAppSelector } from 'hooks/reduxHooks';
import { UserItem } from './UserItem';

type AddChatFormEvent = {
  target: {
    username: { value: string; };
  };
};

interface User {
  uid: string;
  displayName: string;
  photoUrl: string;
};

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const AddChatModal: React.FC<Props> = ({ open, setOpen }) => {
  const state = useAppSelector(state => state.auth);
  const currentUserId = state.user?.uid;
  const chatNames = state.chats.map(chat => chat.displayName);
  
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await getDoc(doc(firestore, 'users/allUsers'));
      setUsers(allUsers.get('users'));
    };

    fetchUsers();
  }, [currentUserId]);
  
  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();

    const
      { target } = e as typeof e & AddChatFormEvent,
      username = target.username.value.trim().toLowerCase();

    if (!username) return;
    
    setFilteredUsers(users.filter(
      user =>
        currentUserId !== user.uid
        && !chatNames.includes(user.displayName)
        && user.displayName.toLowerCase().includes(username)));
  };
  
  return (
    <Modal isOpen={open} onClose={() => setOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Find user</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            as='form'
            onSubmit={handleSubmit}
            gap={2}
          >
            <Input
              size='lg'
              placeholder='Username...'
              name='username'
            />
            <Button type='submit' size='lg'>Find</Button>
          </Flex>

          <div style={{
            width: '100%',
            overflowY: 'auto',
            borderTop: '2px solid #282626',
            marginTop: '32px',
            paddingBottom: '32px',
          }}>
            {filteredUsers.map(user =>
              <UserItem
                key={user.uid}
                user={user}
                close={() => setOpen(false)}
              />)}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export { AddChatModal };