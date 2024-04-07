import classes from './ordersAdmin.module.css';
import { useEffect, useState } from 'react';
import { getAll } from '../../../Services/orderService';
import { Link } from 'react-router-dom';
import OrderItemsList from '../../OrderItemsList/OrderItemsList';

export default function OrdersAdmin() {
  const [pendingorders, setPendingOrders] = useState();
  const [runningorders, setRunningOrders] = useState();

  useEffect(() => {
    loadPendingOrders();
    loadRunningOrders();
  }, []);

  const loadPendingOrders = async () => {
    const pendingorders = await getAll('NEW');
    setPendingOrders(pendingorders);
  };

  const loadRunningOrders = async () => {
    const runningorders = await getAll('RUNNING');
    setRunningOrders(runningorders);
  };

  return (
    <div className={classes.container}>
      <div className={classes.list}>
        <h2>Pending Orders</h2>
        <hr></hr>
        {
          pendingorders && pendingorders.map (order => 
            <div key={order._id} className={classes.orderlist}>
              <div>{order.name}</div>
              <div>Tk. {order.totalPrice}</div>
              <div>Status: {order.status}</div>
              <div className={classes.actions}>
                <Link to={`/details/${order._id}`}>Details</Link>
                &nbsp;
                <Link to={`/approveorder/${order._id}`}>Approve</Link>
              </div>

            </div>)
        }
        <br></br>
        <h2>Running Orders</h2>
        <hr></hr>
        {
          runningorders && runningorders.map (order => 
            <div key={order._id} className={classes.orderlist}>
              <div>{order.name}</div>
              <div>Tk. {order.totalPrice}</div>
              <div>Status: {order.status}</div> &nbsp;

              <div className={classes.orderitems}>
              <OrderItemsList order={order} isTracking={true} isAdmin={true} />
              </div>
            </div>)
        }
      </div>
    </div>
  )
}
