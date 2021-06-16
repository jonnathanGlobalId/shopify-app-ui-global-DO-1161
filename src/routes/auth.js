import Router from "koa-router";
const router = new Router();

router.post("/auth-test-combine", async (ctx) => {
  console.log("Recibiendo la informacion", ctx);
  ctx.body = "Obtener script tag";
});

export default router;
