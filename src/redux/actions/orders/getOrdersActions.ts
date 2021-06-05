import axios from 'axios';
import {Dispatch} from 'redux';
import { GetOrderDispatchTypes } from '../../@types/settingsActionTypes';
import {
  GET_ORDERS,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_REJECT,
  GET_PENDING_ORDERS,
} from '../../types';

export const getOrdersAction = (owner_id: string, draftOrders: DraftOrder[]) => {
  return async (dispatch: Dispatch<GetOrderDispatchTypes>) => {
    dispatch({
      type: GET_ORDERS,
    });
    try {
      const result = await axios.get(`http:localhost:8080/api/orders/${owner_id}`);
      const orderGlobal: Order[] = result.data.data;
      const ordersCompleted: Order[] = [];
      orderGlobal.forEach((order: Order) => {
        draftOrders.forEach((draftOrder: DraftOrder) => {
          const idDraftOrder = draftOrder.node.id.split('/')[4];
          if (order.order_id.toString() === idDraftOrder.toString()) {
            const orderComplete = {...order, customer: {...order.customer, purchase_date: draftOrder.node.createdAt}};
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
      })
    } catch (error) {
      console.log('Hubo un problema para obtener las ordenes');
      dispatch({
        type: GET_ORDERS_REJECT
      })
    }
  }
}