import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
	data: number;
	title: string;
}

const initialState: CounterState = {
	data: 42,
	title: "Yuck - redux toolkit"
};

export const counterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		increment: (state, actions) => {
			state.data += actions.payload;
		},

		decrement: (state, actions) => {
			state.data -= actions.payload;
		}
	}
});

export const { increment, decrement } = counterSlice.actions;
