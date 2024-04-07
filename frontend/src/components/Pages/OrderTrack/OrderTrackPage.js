import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import { trackOrder, updateOrder } from '../../../Services/orderService';
import classes from './orderTrackPage.module.css';
import OrderItemsList from '../../../components/OrderItemsList/OrderItemsList';
import Title from '../../../components/Title/Title';

export default function OrderTrackPage() {
  const [order, setOrder] = useState();

  useEffect(() => {
      trackOrder().then(order => {
        setOrder(order);
      });
  });

  if(!order) {
    return <div className={classes.container}>
            <div className={classes.content}>
              <h1>No Active Order</h1>
            </div>
          </div>
  }

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

        {order.status === 'SERVED' && (
          <div className={classes.payment}>
            {<Link to="/payment">Go To Payment</Link>}
          </div>
        )}
      </div>
    )
  );
}
