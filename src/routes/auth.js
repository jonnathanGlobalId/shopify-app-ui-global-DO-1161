import Router from "koa-router";
import axios from "axios";
import { getAccessToken } from "../routes/getToken";
const koaBody = require("koa-body");

const router = new Router();

router.post("/auth-token", async (ctx) => {
  try {
    const access_token = await getAccessToken();
    ctx.body = {
      token: access_token,
    };
  } catch (error) {
    console.log("Hubo un error para traer el token");
    console.log(error);
    ctx.body = {
      mensaje: "No se pudo localizar el token",
    };
  }
});

router.get("/get-owner-settings/:owner_id", async (ctx) => {
  const owner_id = ctx.params.owner_id;
  console.log("Obteniendo el id del owner", owner_id);
  try {
    const access_token = await getAccessToken();
    const result = await axios.get(
      `${process.env.GLOBAL_ID_API_URL}/owner/${owner_id}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    ctx.body = {
      message: "owner data success",
      data: result.data,
    };
  } catch (error) {
    ctx.status = 401;
    ctx.body = "have a problem to get user";
  }
});

router.put("/save-settings", koaBody(), async (ctx) => {
  const owner_settings = ctx.request.body;
  console.log(owner_settings);
  try {
    const access_token = await getAccessToken();
    const res = await axios.put(
      `${process.env.GLOBAL_ID_API_URL}/owner/${owner_settings.owner_id}`,
      owner_settings,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    console.log(res.data);
    ctx.body = {
      mensaje: "Las configuraciones del usuario cambiaron exitosamente",
    };
  } catch (error) {
    ctx.status = 401;
    ctx.body = "have a problem to change configurations";
  }
});

router.put("/create-user", koaBody(), async (ctx) => {
  const data = ctx.request.body;
  try {
    const access_token = await getAccessToken();
    await axios.put(
      `${process.env.GLOBAL_ID_API_URL}/owner/${data.owner_id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    ctx.body = {
      mensaje: "user created",
    };
  } catch (error) {
    ctx.status = 401;
    ctx.body = "have a problem to change configurations";
  }
});

export default router;
