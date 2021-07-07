import Router from "koa-router";
import axios from "axios";
import { getAccessToken } from "../routes/getToken";
const koaBody = require("koa-body");

const router = new Router();

//Revisar si no hace falta el owner_id
router.get("/orders", async (ctx) => {
  try {
    const access_token = await getAccessToken();
    const result = await axios.get(`${process.env.GLOBAL_ID_API_URL}/order`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    console.log(result.data);
    ctx.body = {
      mensaje: "Searching orders",
    };
  } catch (error) {
    console.log(error.data);
    ctx.body = {
      mensaje: "Oops something happened!",
    };
  }
});

router.put("/change-order/:order_id", koaBody(), async (ctx) => {
  const order_id = ctx.params.order_id;
  const dataSend = ctx.request.body;
  console.log("Orden id desde query", order_id);
  console.log("Datos de la nueva orden body", dataSend);
  try {
    const access_token = await getAccessToken();
    await axios.put(
      `${process.env.GLOBAL_ID_API_URL}/order/${order_id}`,
      dataSend,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    ctx.body = {
      mensaje: "Order saved successfully",
    };
  } catch (error) {
    console.log(error.request.data);
    ctx.body = {
      mensaje: "Error when saving the order",
      error: error,
    };
  }
});

export default router;
