import classes from './callsAdmin.module.css';
import { useEffect, useState } from 'react';
import { getPendingCallers, answerCaller } from '../../../Services/userService';
import { Link } from 'react-router-dom';

export default function OrdersAdmin() {
  const [pendingCallers, setPendingCallers] = useState();

  useEffect(() => {
    loadPendingCallers();
  }, []);

  const loadPendingCallers = async () => {
    const pendingCallers = await getPendingCallers();
    setPendingCallers(pendingCallers);
  };

  return (
    <div className={classes.container}>
      <div className={classes.list}>
        <h2>Pending Callers for waiter</h2>
        <hr></hr>
        {
          pendingCallers && pendingCallers.map (caller => 
            <div key={caller._id} className={classes.orderlist}>
              <div>{caller.name}</div>
              <div className={classes.actions}>
                <Link to={"/answercaller"}>Mark as Answered</Link>
              </div>

            </div>)
        }
      </div>
    </div>
  )
}
