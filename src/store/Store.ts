import { configureStore } from '@reduxjs/toolkit';
import { faqChatSliceReducer } from './FaqChatSlice';
import { useDispatch, type TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
	reducer: {
		faqChatSlice: faqChatSliceReducer,
	},
});

export type StoreStateType = ReturnType<typeof store.getState>;
export type StoreDispatchType = typeof store.dispatch;

export const useTypedDispatch = () => useDispatch<StoreDispatchType>();
export const useTypedSelector: TypedUseSelectorHook<StoreStateType> = useSelector;
