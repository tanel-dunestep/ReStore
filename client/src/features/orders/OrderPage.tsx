import {
	TableContainer,
	Paper,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Button,
	Table,
	Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Order } from "../../app/models/Order";
import { currencyFormat } from "../../app/util/util";
import OrderDetailed from "./OrderDetailed";

export default function OrdersPage() {
	const [orders, setOrders] = useState<Order[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [selectedOrderNumber, setSelectedOrderNumber] = useState(0);

	useEffect(() => {
		agent.Orders.list()
			.then((orders) => setOrders(orders))
			.catch((error) => console.log(error))
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <LoadingComponent message="Loading orders" />;

	if (selectedOrderNumber > 0)
		return (
			<OrderDetailed
				order={orders?.find((o) => o.id === selectedOrderNumber)!}
				setSelectedOrder={setSelectedOrderNumber}
			/>
		);

	return (
		<>
			<Typography sx={{ p: 2 }} gutterBottom variant="h4">
				Orders
			</Typography>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Order number</TableCell>
							<TableCell align="right">Total</TableCell>
							<TableCell align="right">Order Date</TableCell>
							<TableCell align="right">Order Status</TableCell>
							<TableCell align="right"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{orders?.map((order) => (
							<TableRow key={order.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
								<TableCell component="th" scope="row">
									{order.id}
								</TableCell>
								<TableCell align="right">{currencyFormat(order.total)}</TableCell>
								<TableCell align="right">{order.orderDate.split("T")[0]}</TableCell>
								<TableCell align="right">{order.orderStatus}</TableCell>
								<TableCell align="right">
									<Button onClick={() => setSelectedOrderNumber(order.id)}>View</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
