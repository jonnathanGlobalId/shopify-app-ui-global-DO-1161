import axios, { AxiosResponse } from 'axios';
import { GLOBAL_ID_DOMAIN, APP_CLIENT_ID, APP_CLIENT_SECRET } from '../conf';


export async function getAccessToken(): Promise<string> {
  const bearer: AxiosResponse
    = await axios.post(`${GLOBAL_ID_DOMAIN}/v1/auth/token`, {
      client_id: APP_CLIENT_ID,
      client_secret: APP_CLIENT_SECRET,
      grant_type: 'client_credentials',
    })
    console.log(bearer);

  return <string> bearer.data.access_token
}
