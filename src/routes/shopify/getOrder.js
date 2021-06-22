import Router from "koa-router";
import axios from "axios";
import { getAccessToken } from "../getToken";
const koaBody = require("koa-body");

const router = new Router();

router.get("/get-orders/:owner_id", async (ctx) => {
  const owner_id = ctx.params.owner_id;
  try {
    const url = `${process.env.GLOBAL_ID_API_URL}/order?owner_id=${owner_id}`;
    const access_token = await getAccessToken();
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log("Resultado de las ordenes", res.data);
    ctx.body = {
      mensaje: "Buscando las ordenes",
    };
  } catch (error) {
    console.log(error);
    ctx.status = 401;
  }
});

router.post("/delete-order", koaBody(), async (ctx) => {
  const data = ctx.request.body;
  console.log("informacion para cambiar", data);
  const { shop, accessToken } = ctx.sesionFromToken;
  const url = `https://${shop}/admin/api/2021-04/orders/${data?.order_id}/cancel.json`;
  try {
    const res = await axios.post(
      url,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Access-Token": accessToken,
        },
      }
    );
    ctx.body = {
      mensaje: "La orden ha sido cancelada exitosamente",
      data: res.data,
    };
  } catch (error) {
    console.log(error);
    ctx.status = 401;
  }
});

router.post("/complete-order", koaBody(), async (ctx) => {
  const data = ctx.request.body;
  const { shop, accessToken } = ctx.sesionFromToken;
  const url = `https://${shop}/admin/api/2021-04/orders/${data?.order_id}/fulfillments.json`;
  const dataSend = {
    fulfillment: {
      location_id: `${data?.location}`,
    },
  };
  try {
    await axios.post(url, dataSend, {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken,
      },
    });
    console.log("url ha mandar", url);
    console.log("Informacion ha mandar", dataSend);
    ctx.body = {
      mensaje: "Se ha marcado como enviada la orden",
    };
  } catch (error) {
    console.log(error);
    ctx.status = 401;
  }
});

export default router;
