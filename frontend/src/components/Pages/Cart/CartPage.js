import React from 'react'
import classes from './CartPage.module.css'
import { useCart } from '../../../Hooks/useCart';
import { Button } from '../../Button/Button';
import { Link } from 'react-router-dom';

export default function CartPage() {
    const {cart, removeitem, changequant} =useCart();
    if(cart.items.length === 0) {
        return (<div className={classes.container}>
            <h1>Cart is Empty</h1>
        </div>);
        
    }
  return (
    <>
        {cart && cart.items.length > 0 && (
            <div className={classes.container}>
                <ul className={classes.list}>
                    {cart.items.map(item => (
                    <li key={item.food.id}>
                        <div>
                            <img src={`${item.food.image}`}
                            alt = {item.food.name} />
                            &nbsp;
                        </div>
                        <div>
                            {item.food.name}
                            &nbsp;
                        </div>
                        <div>
                            <select value={item.quantity} onChange={e => changequant(item, Number(e.target.value))}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                                <option>13</option>
                                <option>14</option>
                                <option>15</option>
                            </select>
                            &nbsp;
                        </div>
                        <div>
                            Tk.{item.price}
                            &nbsp;
                        </div>
                        <div>
                            <button className={classes.rembut} onClick ={() => removeitem(item.food.id)}>Remove Item</button>
                            &nbsp;
                        </div>
                    </li>
                    ))}
                    
                </ul>
                <div className={classes.total}>
                    Total Price: Tk.{cart.totalPrice}
                </div>
                <div>
                    <Link className={classes.placeOrderButton} to="/checkout"> Place Order </Link>
                </div>
            </div>

        )}
    </>

  )
}
