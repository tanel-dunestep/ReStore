import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { PaginatedResponse } from "../models/Pagination";
import { store } from "../store/configureStore";
const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));
axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use((config) => {
	const token = store.getState().account.user?.token;
	if (token) config.headers!.Authorization = "Bearer " + token;
	return config;
});

axios.interceptors.response.use(
	async (response) => {
		await sleep();
		const pagination = response.headers["pagination"];
		if (pagination) {
			response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
		}
		return response;
	},
	(error: AxiosError) => {
		const { data, status }: { data: any; status: number } = error.response!;
		switch (status) {
			case 400:
				if (data.errors) {
					const modelStateErrors: string[] = [];
					for (const key in data.errors) {
						if (data.errors[key]) {
							modelStateErrors.push(data.errors[key]);
						}
					}
					throw modelStateErrors.flat();
				}
				toast.error(data.title);
				break;
			case 401:
				toast.error(data.title);
				break;
			case 404:
				history.push({ pathname: "/not-found", state: { error: data } });
				break;
			case 500:
				history.push({ pathname: "/server-error", state: { error: data } });
				break;

			default:
				break;
		}

		return Promise.reject(error.response);
	}
);

const requests = {
	get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(responseBody),
	post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
	put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
	delete: (url: string) => axios.delete(url).then(responseBody)
};

const Catalog = {
	list: (params: URLSearchParams) => requests.get("products", params),
	filters: () => requests.get("products/filters"),
	details: (id: number) => requests.get("products/" + id)
};

const TestErrors = {
	get400error: () => requests.get("buggy/bad-request"),
	get401error: () => requests.get("buggy/unauthorized"),
	get404error: () => requests.get("buggy/not-found"),
	get500error: () => requests.get("buggy/server-error"),
	getValidationError: () => requests.get("buggy/validation-error")
};

const Basket = {
	get: () => requests.get("basket"),
	addItem: (productId: number, quantity = 1) =>
		requests.post("basket?productId=" + productId + "&quantity=" + quantity, {}),
	removeItem: (productId: number, quantity = 1) =>
		requests.delete("basket?productId=" + productId + "&quantity=" + quantity)
};

const Account = {
	login: (values: any) => requests.post("account/login", values),
	register: (values: any) => requests.post("account/register", values),
	currentUser: () => requests.get("account/currentUser"),
	fetchAddress: () => requests.get("account/savedAddress")
};

const Orders = {
	list: () => requests.get("orders"),
	fetch: (id: number) => requests.get("orders/" + id),
	create: (values: any) => requests.post("orders", values)
};

const Payments = {
	createPaymentIntent: () => requests.post("payments", {})
};

const agent = {
	Catalog,
	TestErrors,
	Basket,
	Account,
	Orders,
	Payments
};

export default agent;
