import React from 'react'
import Input from '../../Input/Input';
import {useForm} from 'react-hook-form';
import { Link } from 'react-router-dom';
import classes from './registerPage.module.css';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Hooks/useAuth';
import { useEffect } from 'react';

export default function RegisterPage() {
  const auth = useAuth();
  const {user} = auth;
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const returnURL = params.get('returnUrl');

  useEffect(() => {
    if (!user) return;
    returnURL ? navigate(returnURL) :navigate('/');
  }, [user]);
  const {
    handleSubmit,
    register,
    formState: {errors},
    getValues
} = useForm();

const submit = async data => {
  await auth.register(data);
};

  return (
    <div className={classes.container}>
      <h1>Register</h1>
      <div className={classes.details}>
        <form onSubmit = {handleSubmit(submit)} noValidate>
          <Input
            type="text" 
            label="Name"{...register('name', {
              required: true
            })}
          />

          <Input
            type="employee" 
            label="Employee ID"{...register('employee', {
              required: true
            })}
            error = {errors.employee}
          />

          <Input
            type="password" 
            label="Password"{...register('password', {
              required: true
            })}
            error = {errors.password}
          />

          <Input
            type="password" 
            label="Confirm Password"{...register('confirmPassword', {
              required: true,
              validate: value =>
              value !== getValues('password')
              ? 'Passwords Do Not Match'
              : true,
            })}
            error = {errors.confirmPassword}
          />
          <button type="submit" className = {classes.btn}>Register</button>
        </form>
        <div className = {classes.logn}>
              Already Registered? &nbsp;
            <Link to = {`/login${returnURL ? '?returnUrl=' + returnURL : ''}`}>
            Login
            </Link>
        </div>
      </div>
      
    </div>
  )
}
