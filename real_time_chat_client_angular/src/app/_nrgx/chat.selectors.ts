import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChatState } from './chat.reducer';

export const selectChatState = createFeatureSelector<ChatState>('chat');

export const selectMessages = createSelector(
  selectChatState,
  (state: ChatState) => state.messages
);

export const selectUsers = createSelector(
  selectChatState,
  (state: ChatState) => state.users
);