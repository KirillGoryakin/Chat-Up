import { createAsyncThunk } from '@reduxjs/toolkit';
import { firestore } from 'firebaseApp';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc
} from 'firebase/firestore';
import { AuthState } from 'appTypes';
import { addUserToDataBase } from './utils';
import { setCurrentChat } from './AuthSlice';

interface LogInPayload {
  email: string,
  password: string,
};

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (payload: LogInPayload, { rejectWithValue }) => {
    const { email, password } = payload;
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      return;
    } catch (e) {
      return rejectWithValue(e);
    }
  });

interface SignUpPayload extends LogInPayload {
  name: string;
  avatar: string;
};

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (payload: SignUpPayload, { rejectWithValue }) => {
    const { email, password, name, avatar } = payload;
    const auth = getAuth();

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name, photoURL: avatar });

      await addUserToDataBase({
        uid: user.uid,
        displayName: user.displayName,
        photoUrl: user.photoURL,
      });
      
      return;
    } catch (e) {
      return rejectWithValue(e);
    }
  });

export const logInWithGoogle = createAsyncThunk(
  'auth/logInWithGoogle',
  async (_, { rejectWithValue }) => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const { user } = await signInWithPopup(auth, provider);

      await addUserToDataBase({
        uid: user.uid,
        displayName: user.displayName,
        photoUrl: user.photoURL,
      });
      
      return;
    } catch (e) {
      return rejectWithValue(e);
    }
  });

export const logOut = createAsyncThunk(
  'auth/logOut',
  async (_, { rejectWithValue }) => {
    const auth = getAuth();

    try {
      auth.signOut();
      return;
    } catch (e) {
      return rejectWithValue(e);
    }
  });

export const sendMessage = createAsyncThunk(
  'auth/sendMessage',
  async (text: string, { getState, rejectWithValue }) => {
    const state = getState() as { auth: AuthState };
    const uid = state.auth.user?.uid;
    const chatId = state.auth.currentChat?.id;
    const date = Timestamp.now();

    if (!uid || !chatId) return rejectWithValue('Something wend wrong');

    try {
      const allMsgsRef = doc(firestore, `/chats/${chatId}/messages/allMessages`);

      const allMsgsSnap = await getDoc(allMsgsRef);
      const allMsgs = allMsgsSnap.get('messages');
      
      await updateDoc(allMsgsRef, {
        messages: allMsgs.concat({ uid, text, date })
      });

      await updateDoc(doc(firestore, `/chats/${chatId}`), {
        lastUpdated: date
      });
      
      return;
    } catch (e) {
      return rejectWithValue(e);
    }
  });

type CreateChatArg = {
  uid: string;
  displayName: string;
  photoUrl: string;
};
  
export const createChat = createAsyncThunk(
  'auth/createChat',
  async (arg: CreateChatArg, { getState, dispatch, rejectWithValue }) => {
    const state = getState() as { auth: AuthState };
    const user = state.auth.user;

    if (!user) return rejectWithValue('Something wend wrong');

    const newChat = {
      uids: [user.uid, arg.uid],
      users: {
        [user.uid]: {
          displayName: user.displayName,
          photoUrl: user.photoURL,
        },
        [arg.uid]: {
          displayName: arg.displayName,
          photoUrl: arg.photoUrl,
        }
      },
      lastUpdated: Timestamp.now(),
    };
    
    try {
      const chatRef = await addDoc(collection(firestore, 'chats'), newChat);
      await setDoc(doc(firestore, `chats/${chatRef.id}/messages/allMessages`), {
        messages: []
      });

      dispatch(setCurrentChat({
        id: chatRef.id,
        displayName: arg.displayName,
        photoUrl: arg.photoUrl,
      }));

      return;
    } catch (e) {
      return rejectWithValue(e);
    }
  });