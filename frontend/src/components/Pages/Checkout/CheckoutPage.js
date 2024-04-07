import React from 'react';
import { useCart } from '../../../Hooks/useCart';
import { useAuth } from '../../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../Input/Input';
import Button from '../../../components/Button/Button';
import { createOrder } from '../../../Services/orderService';
import classes from './checkoutPage.module.css';
import OrderItemsList from '../../../components/OrderItemsList/OrderItemsList';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState({ ...cart });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = async data => {
    await createOrder({ ...order, name: data.name});
    clearCart();
    navigate('/track');
  };

  return (
    <>
      <form onSubmit={handleSubmit(submit)} className={classes.container}>
        <div className={classes.content}>
        <h1>Confirm Order</h1>
          <div className={classes.inputs}>
            <Input
              defaultValue={user.name}
              {...register('name')}
              error={errors.name}
            />
          </div>
          <OrderItemsList order={order} />
        </div>

        <div className={classes.buttons_container}>
          <div className={classes.buttons}>
            <Button
              type="submit"
              text="Place Order"
              width="100%"
              height="3rem"
              backgroundColor= "purple"
            />
          </div>
        </div>
      </form>
    </>
  );
}
