import { ThemeProvider } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import createTheme from "@mui/material/styles/createTheme";
import { useEffect, useState } from "react";
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
import BasketPage from "../../features/basket/BasketPage";
import { useStoreContext } from "../context/StoreContext";
import agent from "../api/agent";
import { getCookie } from "../util/util";
import LoadingComponent from "./LoadingComponent";
import CheckoutPage from "../../features/checkout/CheckoutPage";

function App() {
	const { setBasket } = useStoreContext();
	const [loading, setLoading] = useState(true);
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		const buyerId = getCookie("buyerId");
		if (buyerId) {
			agent.Basket.get()
				.then((basket) => setBasket(basket))
				.catch((error) => console.log(error))
				.finally(() => setLoading(false));
		} else setLoading(false);
	}, [setBasket]);
	function handleThemeChange() {
		setDarkMode(!darkMode);
	}
	const paletteType = darkMode ? "dark" : "light";
	const theme = createTheme({
		palette: { mode: paletteType, background: { default: paletteType === "light" ? "#eaeaea" : "#121212" } }
	});

	if (loading) return <LoadingComponent message="Initializing app..."></LoadingComponent>;

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
					<Route path="/basket" component={BasketPage}></Route>
					<Route path="/checkout" component={CheckoutPage}></Route>
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
