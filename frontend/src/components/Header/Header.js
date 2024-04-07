import React from 'react'
import classes from './header.module.css'
import { Link } from 'react-router-dom';
import { useAuth } from '../../Hooks/useAuth';

export default function Header() {
  const {user, logout} = useAuth();

  return <header className={classes.header}>
  <div className={classes.container}>
    <Link to="/" className={classes.logo}>
      Kimomo
    </Link>
    <nav>
      <ul>
        {
          user ? (
          <ul>
            <div>
              <Link to='/'>{user.name}</Link>
              {user.admin && <Link to='/admin'>Admin</Link>}
              <Link onClick={logout}>Logout</Link>
              <Link to="/track">Track Order</Link>
              <Link to="/callwaiter">Call For Waiter</Link>
            </div>
          </ul> )
          : (<Link to='/login'>Login</Link>
        )}
        <ul>
          <Link to='/cart'>Cart</Link>
        </ul>

      </ul>
    </nav>
  </div>
  </header>;
}
