import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FaqChatSliceStateType {
	type: 'question' | 'answer' | 'error';
	content: string;
	id: string;
}

const initialState: FaqChatSliceStateType[] = [];

export const faqChatSlice = createSlice({
	name: 'faqChatSlice',
	initialState,
	reducers: {
		pushChatMessage: (state, action: PayloadAction<FaqChatSliceStateType>) => {
			state.push(action.payload);
		},
	},
});

export const { pushChatMessage } = faqChatSlice.actions;
export const faqChatSliceReducer = faqChatSlice.reducer;
