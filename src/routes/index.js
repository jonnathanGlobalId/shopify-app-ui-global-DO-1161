import combineReducers from "koa-combine-routers";
import authRouter from "./auth";
import orderRouter from "./order";
import ordersShopify from "./shopify/getOrder";

const routes = combineReducers(authRouter, orderRouter, ordersShopify);

export default routes;
