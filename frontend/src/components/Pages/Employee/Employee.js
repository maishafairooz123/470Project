import React, { useEffect, useState } from 'react'
import { getAllUser, updateAdmin } from '../../../Services/userService';
import classes from './Employee.module.css';

export default function Employee() {
    const [users, setUsers] = useState();

    useEffect(() => {
        loadUsers();
      });

      const loadUsers = async () => {

        const users = await getAllUser();
        setUsers(users);
      };

      const handleAdmin = async (userId) => {
        await updateAdmin(userId, true);
        loadUsers();
    };

  return (
    <div className={classes.box}>
    <div className={classes.list}>
    <div className={classes.list_users}>
        <h3>Name</h3>
        <h3>ID</h3>
        <h3>Admin Status</h3>
        <h3>Action</h3>
    </div>
    {
        users && users.map(user => 
            <div key={user.id} className={classes.list_users}>
                <span>{user.name}</span>
                <span>{user.employee}</span>
                <span>{user.admin?'Admin' : 'Worker'}</span>
                <span>{user.admin? '' : <button className={classes.makeadmin} onClick={() => handleAdmin(user.id)}>Make Admin</button>}</span>
            </div>
        )
    }
    </div>
    </div>
  )
}
