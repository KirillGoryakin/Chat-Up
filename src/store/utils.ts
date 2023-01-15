import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "firebaseApp";

interface NewUser {
  uid: string;
  displayName: string | null;
  photoUrl: string | null;
};

export const addUserToDataBase = async (newUser: NewUser) => {
  const allUsersRef = doc(firestore, 'users', 'allUsers');
  
  const allUsersSnap = await getDoc(allUsersRef);
  const allUsers = allUsersSnap.get('users');

  if (allUsers.find((user: {uid: string}) => user.uid === newUser.uid))
    return console.log('User is already in Data Base!');

  await updateDoc(allUsersRef, {
    users: allUsers.concat(newUser)
  });
};