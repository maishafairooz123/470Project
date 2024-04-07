import React, { useEffect, useState } from 'react';
import { Link, useParams} from 'react-router-dom';
import { trackOrderById } from '../../../Services/orderService';
import classes from './orderDetailsPage.module.css';
import OrderItemsList from '../../OrderItemsList/OrderItemsList';
import Title from '../../Title/Title';
import { useAuth } from '../../../Hooks/useAuth';

export default function OrderDetailsPage() {
  const [order, setOrder] = useState();
  const { user } = useAuth();
  const { orderId } = useParams();

  //console.log(orderId);

  useEffect(() => {
      if (user.admin && orderId) {
        trackOrderById(orderId).then(order => {
          setOrder(order);
        });
      }
  }, []);

  return (
    order && (
      <div className={classes.container}>
        <div className={classes.content}>
          <h1>Order #{order.id}</h1>
          <div className={classes.header}>
            <div>
              <strong>Name</strong>
              {order.name}
            </div>
            <div>
              <strong>State</strong>
              {order.status}
            </div>
            {order.paymentId && (
              <div>
                <strong>Payment ID</strong>
                {order.paymentId}
              </div>
            )}
          </div>

          <OrderItemsList order={order} isTracking={true} />
        </div>

        {
          <div className={classes.payment}>
            <Link to="/ordersadmin">Back to Orders</Link>
          </div>
        }
      </div>
    )
  );
}
