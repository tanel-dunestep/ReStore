import { ThemeProvider } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import createTheme from "@mui/material/styles/createTheme";
import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";

function App() {
	const [darkMode, setDarkMode] = useState(false);
	function handleThemeChange() {
		setDarkMode(!darkMode);
	}
	const paletteType = darkMode ? "dark" : "light";
	const theme = createTheme({
		palette: { mode: paletteType, background: { default: paletteType === "light" ? "#eaeaea" : "#121212" } }
	});
	return (
		<ThemeProvider theme={theme}>
			<ToastContainer position="bottom-right" hideProgressBar />
			<CssBaseline />
			<Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
			<Container>
				<Switch>
					<Route exact path="/" component={HomePage}></Route>
					<Route exact path="/catalog" component={Catalog}></Route>
					<Route path="/catalog/:id" component={ProductDetails}></Route>
					<Route path="/about" component={AboutPage}></Route>
					<Route path="/contact" component={ContactPage}></Route>
					<Route path="/server-error" component={ServerError}></Route>
					<Route component={NotFound}></Route>
				</Switch>
			</Container>
		</ThemeProvider>
	);
}

export default App;
