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
  Timestamp
} from 'firebase/firestore';
import { AuthState } from 'appTypes';

interface SignInPayload {
  email: string,
  password: string,
};

export const logIn = createAsyncThunk(
  'auth/logIn',
  async (payload: SignInPayload, { rejectWithValue }) => {
    const { email, password } = payload;
    const auth = getAuth();

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      return user;
    } catch (e) {
      return rejectWithValue(e);
    }
  });

interface SignUpPayload extends SignInPayload {
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
      return user;
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
      return user;
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
      const docRef = await addDoc(
        collection(firestore, `/chats/${chatId}/messages`),
        { uid, text, date }
      );

      console.log("Document written with ID: ", docRef.id);
      return;
    } catch (e) {
      return rejectWithValue(e);
    }
  });