import combineReducers from "koa-combine-routers";
import authRouter from "./auth";
import orderRouter from "./order";

const routes = combineReducers(authRouter, orderRouter);

export default routes;
