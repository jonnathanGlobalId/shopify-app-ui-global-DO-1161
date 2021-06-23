import axios from 'axios';
import {Dispatch} from 'redux';
import { GetOrderDispatchTypes } from '../../@types/settingsActionTypes';
import {
  GET_ORDERS,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_REJECT,
  GET_PENDING_ORDERS,
} from '../../types';

enum Status {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED'
}

export const getOrdersAction = (shopName: string, orders: OrderShopify[]) => {
  return async (dispatch: Dispatch<GetOrderDispatchTypes>) => {
    dispatch({
      type: GET_ORDERS,
    });
    console.log('Buscando las ordedes');
    try {
      const shop = shopName.split('.')[0];
      const result = await axios.get(`/get-orders/${shop}`);
      // const result = await axios.get(`http://localhost:3001/api/orders/${owner_id}`);

      console.log('Datos de la api global id', result.data);
      const orderGlobal: Order[] = result.data.data;
      const ordersCompleted: Order[] = [];

      orderGlobal.forEach((order: Order) => {
        orders.forEach((orderShopify: OrderShopify) => {
          const orderShopifyId = orderShopify.node.id.split('/')[4];
          if (order.order_id.toString() === orderShopifyId.toString() && order.status === Status.PENDING) {
            const orderComplete = {...order, customer: {...order.customer, purchase_date: orderShopify.node.createdAt}};
            ordersCompleted.push(orderComplete);
          }
        });
      });

      dispatch({
        type: GET_ORDERS_SUCCESS,
        payload: orderGlobal
      });
      dispatch({
        type: GET_PENDING_ORDERS,
        payload: ordersCompleted
      });
    } catch (error) {
      dispatch({
        type: GET_ORDERS_REJECT
      })
    }
  }
}
