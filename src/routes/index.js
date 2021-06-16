import combineReducers from "koa-combine-routers";
import authRouter from "./auth";

const routes = combineReducers(authRouter);

export default routes;
