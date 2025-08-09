import express from "express";
import authmiddleware from "../middleware/auth.js";
import { placeOrder, verifyOrder, userOrders } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authmiddleware,placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders",authmiddleware,userOrders);

export default orderRouter;  