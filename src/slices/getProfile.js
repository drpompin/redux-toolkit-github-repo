import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProfileDataService from "../services/getprofile.service";

export const getProfile = createAsyncThunk("profile/retrieve", async () => {
	const res = await ProfileDataService.getProfileService();
	return res.data;
});

const profileSlice = createSlice({
	name: "profile",
	initialState: {
		response: [],
		isLoading: false,
	},

	extraReducers: {
		[getProfile.pending]: (state) => {
			state.isLoading = true;
		},
		[getProfile.fulfilled]: (state, action) => {
			state.response = action.payload;
			state.isLoading = false;
		},
		[getProfile.rejected]: (state) => {
			state.isLoading = false;
		},
	},
});
const { reducer } = profileSlice;
export default reducer;
