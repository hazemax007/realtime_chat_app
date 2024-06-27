import { createAction, props } from '@ngrx/store';

export const joinChat = createAction('[Chat] Join', props<{ username: string }>());
export const sendMessage = createAction('[Chat] Send Message', props<{ msg: string }>());
export const receiveMessage = createAction('[Chat] Receive Message', props<{ userId: string; username: string; msg: string }>());
export const loadUsers = createAction('[Chat] Load Users', props<{ users: { id: string; username: string }[] }>());