
import classes from './Admin.module.css'
import { Link } from 'react-router-dom'


export default function Admin() {

  return (
    <div className={classes.box}>
    <div className={classes.foodadmin}>
        <Link to='/foodadmin'>
            Foods
        </Link>
    </div>
    <div>
        <Link to='/callsadmin'>
            Calls
        </Link>
    </div>
    <div>
        <Link to='/ordersadmin'>
            Orders
        </Link>
    </div>
    <div>
        <Link to='/employees'>
            Employees
        </Link>
    </div>
    </div>
  )
}
