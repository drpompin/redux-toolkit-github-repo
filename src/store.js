import { configureStore } from "@reduxjs/toolkit";
import repositoryReducer from "./slices/getRepo";
import profileReducer from "./slices/getProfile";

const reducer = {
	repositories: repositoryReducer,
	profile: profileReducer,
	// auth: authReducer,
};

const store = configureStore({
	reducer: reducer,
	devTools: true,
});
export default store;
