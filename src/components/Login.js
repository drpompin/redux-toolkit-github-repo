import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, initialState } from "../slices/loginSlice";
import GithubIcon from "../static/icons/GitHub.png";

export const Login = () => {
	const dispatch = useDispatch();
	const [data, setData] = useState({ errorMessage: "", isLoading: false });

	const { client_id, redirect_uri } = initialState;

	const getLoginData = async (values) => {
		const data = await dispatch(login(values));
	};

	useEffect(() => {
		// After requesting Github access, Github redirects back to your app with a code parameter
		const url = window.location.href;
		const hasCode = url.includes("?code=");

		// If Github API returns the code parameter
		if (hasCode) {
			const newUrl = url.split("?code=");
			window.history.pushState({}, null, newUrl[0]);
			setData({ ...data, isLoading: true });

			// const requestData = {
			// 	code: newUrl[1],
			// };

			// const proxy_url = state.proxy_url;

			// getLoginData();

			// Use code parameter and other parameters to make POST request to proxy_server
			// fetch(proxy_url, {
			// 	method: "POST",
			// 	body: JSON.stringify(requestData),
			// })
			// 	.then((response) => response.json())
			// 	.then((data) => {
			// 		dispatch({
			// 			type: "LOGIN",
			// 			payload: { user: data, isLoggedIn: true },
			// 		});
			// 	})
			// 	.catch((error) => {
			// 		setData({
			// 			isLoading: false,
			// 			errorMessage: "Sorry! Login failed",
			// 		});
			// 	});
		}
	}, []);

	// if (state.isLoggedIn) {
	// 	return <Redirect to="/" />;
	// }

	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<form className="flex flex-col md:w-1/3 p-10 rounded-lg border justify-center">
				<a
					className="flex flex-col justify-center items-center"
					href={`https://github.com/login/oauth/authorize?scope=user&client_id=${client_id}&redirect_uri=${redirect_uri}`}
					onClick={() => {
						setData({ ...data, errorMessage: "" });
					}}
				>
					<img src={GithubIcon} alt="github" className="w-20 mb-4" />
					<span>Login with GitHub</span>
				</a>
			</form>
		</div>
	);
};
