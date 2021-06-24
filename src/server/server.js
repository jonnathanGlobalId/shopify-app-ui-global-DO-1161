import "@babel/polyfill";
import dotenv from "dotenv";
import "isomorphic-fetch";
import createShopifyAuth, { verifyRequest } from "@shopify/koa-shopify-auth";
import Shopify, { ApiVersion } from "@shopify/shopify-api";
import Koa from "koa";
import next from "next";
import Router from "koa-router";
import { Session } from "@shopify/shopify-api/dist/auth/session";
import routes from "../routes";
import { promisify } from "util";
import redis from "redis";

/*----Informacion de redis para el auth-----*/
// const client = redis.createClient();
// const getAsync = promisify(client.get).bind(client);
// const setAsync = promisify(client.set).bind(client);
// const delAsync = promisify(client.del).bind(client);
// client.on("error", function (error) {
//   console.error(error);
// });
/*----Informacion de redis para el auth-----*/

const router = new Router();
const server = new Koa();

dotenv.config();
const port = parseInt(process.env.PORT, 10) || 8080;
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
});
const handle = app.getRequestHandler();

let sessionVar;

const storeCallback = async (session) => {
  if (!session) return;
  try {
    const res = await setAsync(session.id, JSON.stringify(session));
    return true;
  } catch (error) {
    throw new Error(error);
  }
};
const loadCallback = async (id) => {
  if (id === undefined) return;
  try {
    const reply = await getAsync(id);
    if (reply) {
      sessionVar = JSON.parse(reply);
      return Object.assign(new Session(), JSON.parse(reply));
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
const deleteCallback = async (id) => {
  console.log("delete callback", id);
  try {
    const res = await delAsync(id);
    console.log("Eliminando usuario callback", res);
    return res;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

console.log("Variables de entorno", process.env.SHOPIFY_API_KEY);
console.log("Variables de entorno", process.env.SHOPIFY_API_SECRET);
console.log("Variables de entorno", process.env.SCOPES);
console.log("Variables de entorno", process.env.HOST);

Shopify.Context.initialize({
  // API_KEY: process.env.SHOPIFY_API_KEY,
  API_KEY: "4ba5dbb7ed2ea5b468762c7bf776c798",
  API_SECRET_KEY: "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",
  SCOPES: [
    "read_script_tags",
    "write_script_tags",
    "read_orders",
    "read_draft_orders",
    "write_draft_orders",
    "write_orders",
    "read_inventory",
  ],
  HOST_NAME: process.env.HOST.replace(/https:\/\//, ""),
  API_VERSION: ApiVersion.October20,
  IS_EMBEDDED_APP: true,
  // This should be replaced with your preferred storage strategy
  // SESSION_STORAGE: new Shopify.Session.CustomSessionStorage(
  //   storeCallback,
  //   loadCallback,
  //   deleteCallback
  // ),
  SESSION_STORAGE: new Shopify.Session.MemorySessionStorage(),
});

// Storing the currently active shops in memory will force them to re-login when your server restarts. You should
// persist this object in your app.
const ACTIVE_SHOPIFY_SHOPS = {};
const session = loadCallback();

if (session?.shop && session?.scope) {
  console.log("Revisando datos de sesión load callback", sesion);
  ACTIVE_SHOPIFY_SHOPS[session.shop] = session.scope;
}

const prefixRoutes = "";

app.prepare().then(async () => {
  router.prefix(prefixRoutes);
  server.keys = [Shopify.Context.API_SECRET_KEY];
  server.use(
    createShopifyAuth({
      async afterAuth(ctx) {
        // Access token and shop available in ctx.state.shopify
        const { shop, accessToken, scope } = ctx.state.shopify;
        console.log("Informacion del shop", shop, accessToken);
        ACTIVE_SHOPIFY_SHOPS[shop] = scope;
        sessionVar = ctx.state.shopify;
        const response = await Shopify.Webhooks.Registry.register({
          shop,
          accessToken,
          path: `${prefixRoutes}/webhooks`,
          topic: "APP_UNINSTALLED",
          webhookHandler: async (topic, shop, body) =>
            delete ACTIVE_SHOPIFY_SHOPS[shop],
        });

        if (!response.success) {
          console.log(
            `Failed to register APP_UNINSTALLED webhook: ${response.result}`
          );
        }

        ctx.redirect(`${prefixRoutes}/?shop=${shop}`);
      },
    })
  );

  const handleRequest = async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  };

  router.get("/", async (ctx) => {
    const shop = ctx.query.shop;
    console.log("Instalación información de shop", shop);
    // This shop hasn't been seen yet, go through OAuth to create a session
    if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined) {
      ctx.redirect(`${prefixRoutes}/auth?shop=${shop}`);
    } else {
      await handleRequest(ctx);
    }
  });

  router.post("/webhooks", async (ctx) => {
    try {
      await Shopify.Webhooks.Registry.process(ctx.req, ctx.res);
      console.log(`Webhook processed, returned status code 200`);
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`);
    }
  });

  router.post(
    "/graphql",
    verifyRequest({ returnHeader: true }),
    async (ctx, next) => {
      await Shopify.Utils.graphqlProxy(ctx.req, ctx.res);
    }
  );

  const okStatus = (ctx) => {
    ctx.status = 200;
  };

  router.get("/health/alive", okStatus);

  router.get("/health/ready", okStatus);

  router.get("/health/status", okStatus);

  router.get("(/_next/static/.*)", handleRequest); // Static content is clear
  router.get("/_next/webpack-hmr", handleRequest); // Webpack content is clear
  router.get("(.*)", verifyRequest(), handleRequest); // Everything else must have sessions

  const injectSession = async (ctx, next) => {
    try {
      // const currentSession = await Shopify.Utils.loadCurrentSession(ctx.req, ctx.res);
      let sessionData;
      if (sessionVar !== undefined) {
        sessionData = {
          shop: sessionVar?.shop,
          accessToken: sessionVar?.accessToken,
        };
        console.log("Information about acces token and shop", sessionData);
        ctx.sesionFromToken = sessionData;
      }
      return next();
    } catch (error) {
      console.log(error);
    }
  };

  server.use(injectSession);
  server.use(routes());
  server.use(router.allowedMethods());
  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Running on port: ${port}`);
  });
});
