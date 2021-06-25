import Router from "koa-router";
import axios from "axios";
import { getAccessToken } from "../getToken";
const koaBody = require("koa-body");

const router = new Router();

router.get("/get-orders/:shop", async (ctx) => {
  const shop = ctx.params.shop;
  console.log("nombre de la tienda en router", shop);
  try {
    const url = `${process.env.GLOBAL_ID_API_URL}/order?shop=${shop}`;
    const access_token = await getAccessToken();
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    ctx.body = {
      mensaje: "user Orders",
      data: res.data,
    };
  } catch (error) {
    // console.log(error);
    ctx.status = 401;
  }
});

router.post("/delete-order", koaBody(), async (ctx) => {
  const data = ctx.request.body;
  const { shop, accessToken } = ctx.sesionFromToken;

  console.log("-------------------------------------------");
  console.log("information to change status delete", data);
  console.log("Data shopify delete order", accessToken, shop);
  console.log("-------------------------------------------");

  try {
    /* Shopify Request to delete Order */
    const url = `https://${shop}/admin/api/2021-04/orders/${data?.order_id}/cancel.json`;
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
    /* Shopify Request to delete Order */

    /* Global id Request to change status Order */
    const access_token = await getAccessToken();
    await axios.put(
      `${process.env.GLOBAL_ID_API_URL}/order/${data.order_id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    /* Global id Request to change status Order */

    /* Result of request */
    ctx.body = {
      mensaje: "La orden ha sido cancelada exitosamente",
      data: res.data,
    };

    /* Result of request */
  } catch (error) {
    console.log(error);
    ctx.status = 401;
  }
});

router.post("/complete-order", koaBody(), async (ctx) => {
  const data = ctx.request.body;
  const { shop, accessToken } = ctx.sesionFromToken;
  console.log("-------------------------------------------");
  console.log("Data shopify delete order", accessToken, shop);
  console.log("data to change status order completed", data);
  console.log("-------------------------------------------");

  try {
    /* Shopify Request to change status Order */
    const url = `https://${shop}/admin/api/2021-04/orders/${data.order_id}/fulfillments.json`;
    const dataSend = {
      fulfillment: {
        location_id: `${data?.location}`,
      },
    };
    await axios.post(url, dataSend, {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken,
      },
    });
    /* Shopify Request to change status Order */

    /* Global id Request to change status Order */
    const access_token = await getAccessToken();
    await axios.put(
      `${process.env.GLOBAL_ID_API_URL}/order/${data.order_id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    /* Global id Request to change status Order */

    /* Result of request */
    ctx.body = {
      mensaje: "Se ha marcado como enviada la orden",
    };
    /* Result of request */
  } catch (error) {
    console.log(error);
    ctx.status = 401;
  }
});

export default router;
