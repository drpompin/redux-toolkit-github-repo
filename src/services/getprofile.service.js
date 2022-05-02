import axios from "axios";

const headers = {
	"Content-Type": "application/json",
};

const getProfileService = async () => {
	try {
		const response = await axios.get("https://api.github.com/users/drpompin", {
			headers: headers,
		});
		return response;
	} catch (error) {
		console.log("errr", error);
	}
};

const ProfileDataService = {
	getProfileService,
};

// class RepositoryDataService {
// 	getAll() {
// 		console.log("workssssss");
// 		return http.get("/repository");
// 	}
// }

export default ProfileDataService;
