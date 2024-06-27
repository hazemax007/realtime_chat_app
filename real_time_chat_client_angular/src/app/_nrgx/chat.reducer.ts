import { createReducer, on } from '@ngrx/store';
import { joinChat, sendMessage, receiveMessage, loadUsers } from './chat.actions';

export interface ChatState {
  messages: { userId: string; username: string; msg: string }[];
  users: { id: string; username: string }[];
}

export const initialState: ChatState = {
  messages: [],
  users: [],
};

export const chatReducer = createReducer(
  initialState,
  on(joinChat, state => state),
  on(sendMessage, state => state),
  on(receiveMessage, (state, { userId, username, msg }) => ({
    ...state,
    messages: [...state.messages, { userId, username, msg }],
  })),
  on(loadUsers, (state, { users }) => ({
    ...state,
    users,
  }))
);