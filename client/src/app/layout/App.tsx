import { ThemeProvider } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import createTheme from "@mui/material/styles/createTheme";
import { useState } from "react";
import Catalog from "../../features/catalog/Catalog";
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
				<Catalog />
			</Container>
		</ThemeProvider>
	);
}

export default App;
