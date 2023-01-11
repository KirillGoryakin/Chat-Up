import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  updateProfile,
  User,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';

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

export interface AuthState {
  user: User | null;
};

const initialState: AuthState = {
  user: null,
};

const setUser = (
  state: AuthState,
  action: PayloadAction<User | null>
) => {
  state.user = action.payload;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut(state){
      state.user = null;
    },
  },
  extraReducers: {
    [signUp.fulfilled.type]: setUser,
    [logIn.fulfilled.type]: setUser,
    [logInWithGoogle.fulfilled.type]: setUser,
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;