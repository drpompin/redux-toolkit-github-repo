import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRepositories } from "../slices/getRepo";
import { getProfile } from "../slices/getProfile";
import contactIcon from "../static/icons/contactIcon.svg";
import starIcon from "../static/icons/starIcon.svg";
import droppDownArrow from "../static/icons/arrowDropDown.svg";
import puzzleIcon from "../static/icons/puzzleIcon.svg";
import dashboardIcon from "../static/icons/dashboardIcon.svg";
import smileIcon from "../static/icons/smileIcon.svg";
import groupIcon from "../static/icons/group.svg";
import locationIcon from "../static/icons/pinIcon.png";
import messageIcon from "../static/icons/mailIcon.svg";
import twitterIcon from "../static/icons/twitterIcon.svg";
import receiptIcon from "../static/icons/receiptIcon.svg";
import linkIcon from "../static/icons/linkIcon.png";
import newRepositoryIcon from "../static/icons/newRepositoryIcon.png";
import newBoxIcon from "../static/icons/newBoxIcon.png";
import badgeIcon from "../static/icons/badgeIcon.svg";
import closeIcon from "../static/icons/closeIcon.svg";

export const GetRepoComponent = () => {
	const dispatch = useDispatch();
	const [itemSelected, setItemSelected] = useState(1);
	const [reposData, setReposData] = useState([]);
	const [reposFilterData, setReposFilterData] = useState([]);
	const [initialReposData, setInitialReposData] = useState([]);
	const [profileData, setProfileData] = useState({});
	const [selectedDropdown, setSelectedDropdown] = useState("");
	const [query, setQuery] = useState(null);

	const loadingRepositoryState = useSelector((state) => state?.repositories?.isLoading);
	const loadingProfileState = useSelector((state) => state?.profile?.isLoading);

	const getRepos = async () => {
		const data = await dispatch(getRepositories());
		setReposData(data.payload);
		setInitialReposData(data.payload);
		console.log("getRepos data", data.payload);
	};

	const getProfileData = async () => {
		const data = await dispatch(getProfile());
		setProfileData(data.payload);
		console.log("getProfileData payload", data.payload);
	};

	useEffect(() => {
		getRepos();
		getProfileData();
	}, []);

	const filterData = reposFilterData?.length > 0 ? reposFilterData : reposData;

	const filterRepo = (query) => {
		const filteritem = reposData?.filter((filtereditem) => filtereditem?.name?.includes(query));
		setReposFilterData(filteritem);
		if (query?.length < 1) {
			setReposFilterData([]);
		}
	};

	useEffect(() => {
		const timeOutId = setTimeout(() => filterRepo(query), 1000);
		return () => clearTimeout(timeOutId);
	}, [query]);

	const IconsArray = [
		{ icon: contactIcon, title: "Overview" },
		{ icon: newRepositoryIcon, title: "Repositories", value: profileData?.public_repos },
		{ icon: dashboardIcon, title: "Projects" },
		{ icon: newBoxIcon, title: "Packages" },
		{ icon: starIcon, title: "Stars", value: profileData?.public_gists },
	];

	const typeListArr = ["All", "Public", "Private", "Sources", "Forks", "Archived", "Mirrors", "Templates"];
	const languageListArr = ["All", "JavaScript", "Python", "HTML"];
	const sortListArr = ["Last updated", "Name", "Stars"];

	return (
		<div className="w-full my-10 display">
			{/* {loadingRepositoryState ? <span>Loading...</span> : ? <div></div>
            :etRepoComponent"} */}

			<div className="hidden w-full px-6 m-auto md:flex md:w-full xl:px-0 xl:w-[1216px] gap-6">
				<div className="w-1/4"></div>

				<div className="w-3/4 flex px-4 gap-2">
					{IconsArray.map((item, index) => {
						return (
							<div
								key={index}
								className={` cursor-pointer ${
									itemSelected === index
										? "border-b-2 border-[#fd8c73] font-bold"
										: "border-b-2 border-transparent font-medium"
								}`}
								onClick={() => setItemSelected(index)}
							>
								<div className="flex gap-2 items-center py-1 px-2 rounded-lg hover:bg-neutral-100 cursor-pointer text-xs xl:text-sm mb-2">
									<img src={item.icon} alt="contact icon" className="w-4" loading="lazy" />
									<span>{item.title}</span>
									{item?.value && (
										<span className="px-2 rounded-2xl bg-neutral-200">{item?.value}</span>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>

			<hr />

			<div className="w-full px-6 m-auto flex flex-col md:flex-row gap-6 justify-between md:flex md:w-full xl:px-0 xl:w-[1216px]">
				{loadingProfileState ? (
					<div className="w-1/3 text-left py-10 px-2 font-bold">Loading Profile data</div>
				) : (
					<div className="w-1/3 lg:w-1/4">
						<div className="w-full relative">
							<img
								src={profileData?.avatar_url}
								alt="profile img"
								className="absolute w-64 h-64 xl:w-[296px] xl:h-[296px] left-0 -top-8 rounded-full overflow-hidden border-2"
							/>

							<img
								src={smileIcon}
								alt="smile"
								className="absolute left-52 top-40 xl:left-64 xl:top-48 p-2 rounded-full border bg-white w-[38px] h-[38px]"
							/>
						</div>

						<div className="mt-64 pt-6">
							<p className="text-2xl font-bold">{profileData?.name}</p>
							<p className="text-xl text-[#57606a]">{profileData?.login}</p>
							<p className="text-neutral-800 font-medium mt-2">{profileData?.bio}</p>

							<button className="w-full rounded-md my-5 hover:bg-[#f3f4f6] border font-medium border-[#1b1f2426] text-sm p-1.5">
								Edit profile
							</button>

							<div className="flex items-center">
								<span className="flex items-center">
									<img src={groupIcon} alt="group" className="w-4 h-4 mr-1" />
									<span className="text-[#57606a]">
										<strong className="text-black">{profileData?.followers}</strong> followers
									</span>
								</span>

								<div className="flex items-center justify-center">
									<span className="p-[1px] rounded-full mx-1.5 bg-black"></span>
								</div>

								<span className="flex items-center">
									<span className="text-[#57606a]">
										<strong className="text-black">{profileData?.following}</strong> following
									</span>
								</span>
							</div>

							<div className="mt-4">
								<div className="flex items-center mb-1">
									<img src={locationIcon} alt="location" className="w-[14px] h-[14px] font-" />
									<span className="text-sm ml-2 text-[#24292f] font-medium">
										{profileData?.location}
									</span>
								</div>
								<div className="flex items-center mb-1">
									<img src={messageIcon} alt="location" className="w-[14px] h-[14px] font-" />
									<span className="text-sm ml-2 text-[#24292f] font-medium">ayo4oyo@gmail.com</span>
								</div>
								<div className="flex items-center mb-1">
									<img src={linkIcon} alt="location" className="w-[14px] h-[14px] font-" />
									<span className="text-sm ml-2 text-[#24292f] font-medium">{profileData?.blog}</span>
								</div>
								<div className="flex items-center mb-1">
									<img src={twitterIcon} alt="location" className="w-[14px] h-[14px] font-" />
									<span className="text-sm ml-2 text-[#24292f] font-medium">
										{profileData?.twitter_username}
									</span>
								</div>
							</div>

							<hr className="border-1 my-5" />

							<div className="mt-4">
								<p className="font-bold">Achievements</p>
								<img src={badgeIcon} alt="badge" className="w-16 mt-2" />
							</div>

							<hr className="border-1 my-5" />

							<div className="mt-4">
								<p className="font-bold">Organizations</p>
								<span className="flex items-center">
									<img src={puzzleIcon} alt="badge" className="w-16 mt-2 mx-1" />
									<img src={puzzleIcon} alt="badge" className="w-16 mt-2 mx-1" />
								</span>
							</div>
						</div>
					</div>
				)}

				{loadingRepositoryState ? (
					<div className="w-2/3 text-left py-10 px-2 font-bold">Loading Repository data</div>
				) : (
					<div className="w-2/3 lg:w-3/4 ">
						<div className="flex justify-between gap-4 my-4">
							<input
								type="text"
								placeholder="Find a repository..."
								className="border rounded-md px-2 w-1/2"
								// value={query}
								onChange={(event) => setQuery(event.target.value)}
								// onChange={(e) => searchRepository(e.target.value)}
							/>

							<div className="flex w-1/2">
								<div className="rounded-lg hover:bg-neutral-100 border cursor-pointer text-sm font-bold text-neutral-700 bg-[#f6f8fa] relative">
									<span
										className="flex ml-2 items-center p-1 px-4"
										onClick={() =>
											selectedDropdown === "type"
												? setSelectedDropdown("")
												: setSelectedDropdown("type")
										}
									>
										Type <img src={droppDownArrow} alt="dropdown arrow" className="ml-1 w-4 h-4" />
									</span>

									{selectedDropdown === "type" && (
										<div className="w-72 absolute right-0 top-8 border rounded-lg bg-white z-20">
											<div className="flex justify-between items-center px-2 py-1 border-b border-neutral-200">
												Select type{" "}
												<img
													src={closeIcon}
													alt="close"
													className="w-4 h-4 rounded-full"
													onClick={() => setSelectedDropdown("")}
												/>
											</div>
											{typeListArr?.map((typeItem, index) => {
												return (
													<div
														className="px-2 py-2 border-b border-neutral-200 text-xs font-bold text-left hover:bg-neutral-100"
														key={index}
														onClick={() => setSelectedDropdown("")}
													>
														{typeItem}
													</div>
												);
											})}
										</div>
									)}
								</div>

								<div className="ml-2 rounded-lg hover:bg-neutral-100 border cursor-pointer text-sm font-bold text-neutral-700 bg-[#f6f8fa] relative">
									<span
										className="flex ml-2 items-center p-1 px-4"
										onClick={() =>
											selectedDropdown === "language"
												? setSelectedDropdown("")
												: setSelectedDropdown("language")
										}
									>
										Language{" "}
										<img src={droppDownArrow} alt="dropdown arrow" className="ml-1 w-4 h-4" />
									</span>

									{selectedDropdown === "language" && (
										<div className="w-72 absolute right-0 top-8 border rounded-lg bg-white z-20">
											<div className="flex justify-between items-center px-2 py-1 border-b border-neutral-200">
												Select language{" "}
												<img
													src={closeIcon}
													alt="close"
													className="w-4 h-4 rounded-full"
													onClick={() => setSelectedDropdown("")}
												/>
											</div>
											{languageListArr?.map((typeItem, index) => {
												return (
													<div
														className="px-2 py-2 border-b border-neutral-200 text-xs font-bold text-left hover:bg-neutral-100"
														key={index}
														onClick={() => setSelectedDropdown("")}
													>
														{typeItem}
													</div>
												);
											})}
										</div>
									)}
								</div>

								<div className="ml-2 rounded-lg hover:bg-neutral-100 border cursor-pointer text-sm font-bold text-neutral-700 bg-[#f6f8fa] relative">
									<span
										className="flex ml-2 items-center p-1 px-4"
										onClick={() =>
											selectedDropdown === "sort"
												? setSelectedDropdown("")
												: setSelectedDropdown("sort")
										}
									>
										Sort <img src={droppDownArrow} alt="dropdown arrow" className="ml-1 w-4 h-4" />
									</span>

									{selectedDropdown === "sort" && (
										<div className="w-72 absolute right-0 top-8 border rounded-lg bg-white z-20">
											<div className="flex justify-between items-center px-2 py-1 border-b border-neutral-200">
												Select order{" "}
												<img
													src={closeIcon}
													alt="close"
													className="w-4 h-4 rounded-full"
													onClick={() => setSelectedDropdown("")}
												/>
											</div>
											{sortListArr?.map((typeItem, index) => {
												return (
													<div
														className="px-2 py-2 border-b border-neutral-200 text-xs font-bold text-left hover:bg-neutral-100"
														key={index}
														onClick={() => setSelectedDropdown("")}
													>
														{typeItem}
													</div>
												);
											})}
										</div>
									)}
								</div>

								<div className="flex ml-2 items-center p-1 px-4 rounded-lg hover:bg-[#2c974b] text-sm font-bold border cursor-pointer bg-[#2da44e] text-white">
									<img src={receiptIcon} alt="dropdown arrow" className="mr-1 w-4 h-4 text-white" />{" "}
									New
								</div>
							</div>
						</div>

						<hr />

						<div>
							{filterData?.map((repoItem, index) => {
								const updatedDateMonth = new Date(repoItem?.updated_at);
								const updatedDateDay = new Date(repoItem?.updated_at);
								return (
									<React.Fragment key={index}>
										<div className="my-6">
											<div className="flex justify-between items-center">
												<span className="flex items-center">
													<a
														href={repoItem?.html_url}
														className="mr-2 text-[#0969da] font-bold hover:underline cursor-pointer text-xl"
													>
														{repoItem?.name}
													</a>
													<p className="px-3 border rounded-3xl text-xs capitalize font-medium text-[#57606a]">
														{repoItem?.visibility}
													</p>
												</span>

												<div className="flex ml-2 items-center p-1 px-2 rounded-md bg-[#f6f8fa] hover:bg-neutral-100 border cursor-pointer">
													<span className="flex items-center pr-2 border-r text-xs font-medium">
														<img src={starIcon} alt="dropdown arrow" className="w-4 h-4" />
														Star{" "}
													</span>

													<img
														src={droppDownArrow}
														alt="dropdown arrow"
														className="ml-2 w-4 h-4"
													/>
												</div>
											</div>

											<div className="flex justify-between items-end mt-2">
												<div className="pr-6 mb-2 text-sm text-[#57606a]">
													{repoItem?.description}
												</div>

												<div className=""></div>
											</div>

											<div className="flex justify-between items-start mt-2">
												<div className="flex items-center">
													<span className="p-1.5 mr-1 rounded-full bg-yellow-300"></span>

													<span className="ml-2 mr-4 text-xs">{repoItem?.language}</span>
													<span className="text-xs">
														Updated on {updatedDateDay?.getDate()}{" "}
														{updatedDateMonth.toLocaleString("default", {
															month: "short",
														})}
													</span>
												</div>

												<div className="w-[155px] border-b border border-[#9de4ad]"></div>
											</div>
										</div>
										<hr />
									</React.Fragment>
								);
							})}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
