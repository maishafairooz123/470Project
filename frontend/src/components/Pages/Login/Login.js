import React, { useEffect } from 'react'
import {useForm} from 'react-hook-form';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import classes from './Login.module.css';
import { useAuth } from '../../../Hooks/useAuth';
import Input from '../../Input/Input';

export default function Login() {
    const {
        handleSubmit,
        register,
        formState: {errors},
    } = useForm();

    const navigate = useNavigate();
    const {user, login} = useAuth();
    const [params] = useSearchParams();
    const returnURL = params.get('returnURL');

    useEffect(() => {
        if (!user) return;
        returnURL ? navigate(returnURL) : navigate('/');
    }, [user]);

    const submit = async ({employee, password}) => {
        await login(employee, password);
    };

  return (

    <div className = {classes.contatiner}>
        <h1>Login</h1>
        <div className={classes.details}>

            <form onSubmit={handleSubmit(submit)} noValidate>
                <Input 
                type="employee"
                label="Employee ID"
                {...register('employee', {
                    required: true, 
                    pattern: {
                        message: "Not a Valid ID",
                    },         
            })}
            error={errors.email}
            />
            <Input 
            type="password"
            label="Password"
            {...register('password', {
                required: true,
            })}
            error={errors.password}
            />

            <button type="submit" className={classes.submit}>
            Submit
            </button>
            </form>
        <div className={classes.reg}>
            Create a New Employee! &nbsp;  
            <Link to={`/register${returnURL ? 'returnUrl=' + returnURL : ''}`}>
            Register
            </Link>
        </div>
        </div>
      
    </div>
  )
}
