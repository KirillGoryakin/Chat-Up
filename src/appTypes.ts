import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

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
};
export interface AuthState {
  user: User | null;
  chats: Chat[];
  currentChat: Chat | null;
  currentMessages: Message[];
};