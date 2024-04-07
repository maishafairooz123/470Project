import React from 'react'
import classes from './thumbnails.module.css'
import { useCart } from '../../Hooks/useCart';

export default function Thumbnails({foods}) {

    const{addmore, cart} = useCart();

    const addcart = (food) => {
        const existingItem = cart.items.find(item => item.food.id === food.id);
        if (existingItem && existingItem.quantity >= 15) {
            return;
        }
        addmore(food);
    }
  
  return <ul className={classes.list}>
        {
        foods.map(food => 
           <li key={food.id}>
            <img className={classes.image}
            src={`${food.image}`}
            alt={food.name} />
            <div className={classes.content}>
                <div className={classes.name}>
                    {food.name}
                </div>
                <div className={classes.footer}>
                    <div className={classes.description}>
                        {food.description}
                    </div>
                    <div className={classes.price}>
                        Tk.{food.price}
                    </div>
                    <div className={classes.add}>
                        <button className={classes.cartbut} onClick={() => addcart(food)}>Add to Cart</button>
                    </div>
                </div>
            </div>                
           </li> 
        )
        }
    </ul>;
}
