import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { firestore } from 'firebaseApp';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  updateProfile,
  User,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  Timestamp
} from 'firebase/firestore';

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
  async (payload: SignUpPayload, {rejectWithValue}) => {
    const { email, password, name, avatar } = payload;
    const auth = getAuth();

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name, photoURL: avatar });
      return user;
    } catch(e) {
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
      return null;
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

export interface Message {
  id: string;
  text: string;
  uid: string;
  date: Timestamp;
};
export interface Chat {
  id: string;
  displayName: string;
  photoUrl: string;
  messages: Message[];
};
export interface AuthState {
  user: User | null;
  currentChat: Chat | null;
};

const initialState: AuthState = {
  user: null,
  currentChat: {
    id: 'NtlWol0Rd1VRXoYKJiJL',
    displayName: 'Kirill Goryakin',
    photoUrl: 'https://lh3.googleusercontent.com/a/AEdFTp658XskiFQWoz_TWcIjRWK-QbHYaLFl4eTIGSgw=s96-c',
    messages: []
  },
};

const setUser = (
  state: AuthState,
  action: PayloadAction<User | null>
) => {
  state.user = action.payload;
};

const logError = (
  _: any,
  action: PayloadAction<any>
) => console.error(action.payload);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMessages(state, action: PayloadAction<Message[]>){
      if (!state.currentChat?.messages) return;
      state.currentChat.messages = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(logIn.fulfilled, setUser)
      .addCase(logIn.rejected, logError)
      .addCase(signUp.fulfilled, setUser)
      .addCase(signUp.rejected, logError)
      .addCase(logInWithGoogle.fulfilled, setUser)
      .addCase(logInWithGoogle.rejected, logError)
      .addCase(logOut.fulfilled, setUser)
      .addCase(logOut.rejected, logError)
      .addCase(sendMessage.rejected, logError)
});

export const { setMessages } = authSlice.actions;
export default authSlice.reducer;