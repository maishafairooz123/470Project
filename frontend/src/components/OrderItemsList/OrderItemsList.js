import React from 'react';
import { Link } from 'react-router-dom';
import classes from './orderItemsList.module.css';

export default function OrderItemsList({ order, isTracking = false, isAdmin = false }) {
  const isRunning = (order.status === 'RUNNING');
  const statusMap = {
    NEW: { text: 'Preparing', color: 'blue' },
    SERVED: { text: 'Served', color: 'green' }
  };

  return (
    <table className={classes.table}>
      <tbody>
        <tr>
          <td colSpan="8">
            <h3>Order Items:</h3>
          </td>
        </tr>
        {order.items.map(item => (
          <tr key={item.food.id}>
            <td>
                <img src={item.food.image} alt=' '/>
            </td>
            <td>{item.food.name}</td>
            {
              !isAdmin &&
              <td>
              ৳ {item.food.price}
              </td>
            }
            {
              isAdmin && <td> &nbsp; &nbsp; </td>
            }
            <td>x{item.quantity}</td>
            {!isAdmin &&
              <td>
              ৳ {item.price}
              {console.log(item)}
              </td>
            }
            <td> {!isAdmin && isRunning && <p style={{ fontWeight: 'bold', color: statusMap[item.status].color }}> {statusMap[item.status].text} </p> } </td>

              {isAdmin && item.status === 'NEW' &&  <td> <Link to={`/serve/${order._id}/${item.food.id}`}> Serve </Link> </td>}

              {isAdmin && item.status === 'SERVED' &&  <td> <p style={{ fontWeight: 'bold', color: statusMap[item.status].color }}> {statusMap[item.status].text} </p></td>}

          </tr>
        ))}

        <tr>
          <td colSpan="3"></td>
          <td>
            <strong>Total :</strong>
          </td>
          <td>
          ৳ {order.totalPrice}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

