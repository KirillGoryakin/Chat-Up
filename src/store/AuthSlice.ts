import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { AuthState, Chat, Message } from 'appTypes';
import {
  logIn,
  logInWithGoogle,
  logOut,
  sendMessage,
  signUp
} from './authThunks';

const initialState: AuthState = {
  user: null,
  chats: [],
  currentChat: null,
  currentMessages: [],
};

const clearState = (state: AuthState) => {
  state.user = null;
  state.chats = [];
  state.currentChat = null;
  state.currentMessages = [];
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
    setCurrentMessages(state, action: PayloadAction<Message[]>){
      state.currentMessages = action.payload;
    },
    setChats(state, action: PayloadAction<Chat[]>) {
      state.chats = action.payload;
    },
    setCurrentChat(state, action: PayloadAction<Chat>) {
      state.currentChat = action.payload;
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
      .addCase(logOut.fulfilled, clearState)
      .addCase(logOut.rejected, logError)
      .addCase(sendMessage.rejected, logError)
});

export const {
  setCurrentMessages,
  setChats,
  setCurrentChat
} = authSlice.actions;
export default authSlice.reducer;