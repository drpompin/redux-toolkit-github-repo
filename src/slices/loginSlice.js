import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import LoginDataService from "../services/getRepo.service";

export const initialState = {
	isLoggedIn: JSON.parse(localStorage.getItem("isLoggedIn")) || false,
	user: JSON.parse(localStorage.getItem("user")) || null,
	client_id: process.env.REACT_APP_CLIENT_ID,
	redirect_uri: process.env.REACT_APP_REDIRECT_URI,
	client_secret: process.env.REACT_APP_CLIENT_SECRET,
	proxy_url: process.env.REACT_APP_PROXY_URL,
	isLoading: false,
};

console.log("initialState", initialState);

export const login = createAsyncThunk("login", async () => {
	const res = await LoginDataService.getLoginService();
	// console.log("res from slice", res.data);
	return res.data;
});

const loginSlice = createSlice({
	name: "login",
	initialState,

	extraReducers: {
		[login.pending]: (state) => {
			state.isLoading = true;
		},
		[login.fulfilled]: (state, action) => {
			localStorage.setItem("isLoggedIn", JSON.stringify(action.payload.isLoggedIn));
			localStorage.setItem("user", JSON.stringify(action.payload.user));
			state.response = action.payload;
			state.isLoading = false;
		},
		[login.rejected]: (state) => {
			localStorage.clear();
			state.response.user = null;
			state.isLoading = false;
		},
	},
});
const { reducer } = loginSlice;
export default reducer;
