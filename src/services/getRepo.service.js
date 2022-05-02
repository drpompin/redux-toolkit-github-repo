import axios from "axios";

const headers = {
	"Content-Type": "application/json",
};

const getRepoService = async () => {
	try {
		const response = await axios.get("https://api.github.com/users/drpompin/repos?per_page=20", {
			headers: headers,
		});
		return response;
	} catch (error) {
		console.log("errr", error);
	}
};

const filterRepoService = async (query) => {
	try {
		const response = await axios.get(`https://api.github.com/users/drpompin/repos?name=${query}`, {
			headers: headers,
		});
		return response;
	} catch (error) {
		console.log("errr", error);
	}
};

const RepositoryDataService = {
	getRepoService,
	filterRepoService,
};

export default RepositoryDataService;
