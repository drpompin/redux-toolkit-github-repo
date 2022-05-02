import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import RepositoryDataService from "../services/getRepo.service";

// const initialState = [];

export const getRepositories = createAsyncThunk("repositories/retrieve", async () => {
	const res = await RepositoryDataService.getRepoService();
	// console.log("res from slice", res.data);
	return res.data;
});

const repositorySlice = createSlice({
	name: "repository",
	initialState: {
		response: [],
		isLoading: false,
	},

	extraReducers: {
		[getRepositories.pending]: (state) => {
			state.isLoading = true;
		},
		[getRepositories.fulfilled]: (state, action) => {
			state.response = action.payload;
			state.isLoading = false;
		},
		[getRepositories.rejected]: (state) => {
			state.isLoading = false;
		},
	},
});
const { reducer } = repositorySlice;
export default reducer;
