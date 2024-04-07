import React, { useState, useEffect } from 'react';
import classes from './paymentPage.module.css';
import { trackOrder } from '../../../Services/orderService';
import { useNavigate } from 'react-router-dom';
import Title from '../../../components/Title/Title';
import OrderItemsList from '../../../components/OrderItemsList/OrderItemsList';
import PaypalButtons from '../../../components/PaypalButtons/PaypalButtons';
import { completeOrder } from '../../../Services/orderService';
import { useForm } from 'react-hook-form';
import Button from '../../Button/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../Hooks/useAuth';
import { toast } from 'react-toastify'

export default function PaymentPage() {
  const [order, setOrder] = useState();
  const {user} = useAuth();
  const navigate = useNavigate();
  const {
    handleSubmit,
  } = useForm();

  const submit = async data => {
    await completeOrder(user);
    toast.success("Order Completed Succesfully");
    navigate('/');
  };

  useEffect(() => {
    trackOrder().then(data => setOrder(data));
  }, []);

  if (!order) return;

  return (
    <>
      <div className={classes.container}>
        <div className={classes.content}>
          {/* <Title title="Order Form" fontSize="1.6rem" /> */}
          <div className={classes.summary}>
            <div>
              <h3>Name:</h3>
              <span>{order.name}</span>
            </div>
          </div>
          <OrderItemsList order={order} />
        </div>

        <div className={classes.buttons_container}>
        
          <div className={classes.buttons}>
          <form onSubmit={handleSubmit(submit)} className={classes.container}>
              <Button
                type="submit"
                text="Complete Order"
                width="100%"
                height="3rem"
                backgroundColor= "#4c0179"
              />
        </form>
            <PaypalButtons order={order} />
          </div>
        </div>

        
      </div>
    </>
  );
}