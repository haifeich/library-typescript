import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Editbook from "./pages/Editbook";
import Nav from "./components/nav";
import Footer from "./components/footer";

const appDiv = document.getElementById("app");

if (!(appDiv instanceof HTMLDivElement)) {
	throw new Error("No div with id 'app' found");
}

const App = (): JSX.Element => {
	return (
		<HashRouter>
			<Nav />
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/add">
					<Add />
				</Route>
				<Route path="/book/:ID" children={<Editbook />}></Route>
			</Switch>

			<Footer />
		</HashRouter>
	);
}

ReactDOM.render(<App />, appDiv);
