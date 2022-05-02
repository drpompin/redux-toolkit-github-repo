import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import { GetRepoComponent } from "./components/getRepoComponent";
import { Login } from "./components/Login";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/" element={<GetRepoComponent />}></Route>
				<Route
					path="*"
					element={
						<main className="w-screen h-screen flex justify-center items-center">
							<p className="font-bold text-xl">Sorry! This page does not exist.</p>
						</main>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
