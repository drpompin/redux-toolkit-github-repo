import axios from "axios";

const headers = {
	"Content-Type": "application/json",
};

const loginService = async (query) => {
	try {
		const response = await axios.post(["https://api.github.com/users/drpompin/repos?per_page=20", query], {
			headers: headers,
		});
		return response;
	} catch (error) {
		console.log("errr", error);
	}
};

const LoginDataService = {
	loginService,
};

export default LoginDataService;
