import axios from "axios";
export async function getAccessToken() {
  const bearer = await axios.post(
    `${process.env.GLOBAL_ID_DOMAIN}/v1/auth/token`,
    {
      client_id: process.env.APP_CLIENT_ID,
      client_secret: process.env.APP_CLIENT_SECRET,
      grant_type: "client_credentials",
    }
  );
  return bearer.data.access_token;
}
