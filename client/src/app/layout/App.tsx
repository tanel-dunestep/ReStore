import { ThemeProvider } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import createTheme from "@mui/material/styles/createTheme";
import { useState } from "react";
import { Route } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";

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
			<CssBaseline />
			<Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
			<Container>
				<Route exact path="/" component={HomePage}></Route>
				<Route exact path="/catalog" component={Catalog}></Route>
				<Route path="/catalog/:id" component={ProductDetails}></Route>
				<Route path="/about" component={AboutPage}></Route>
				<Route path="/contact" component={ContactPage}></Route>
			</Container>
		</ThemeProvider>
	);
}

export default App;
