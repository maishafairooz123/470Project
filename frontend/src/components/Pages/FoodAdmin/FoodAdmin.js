import classes from './FoodAdmin.module.css';
import { useEffect, useState } from 'react';
import { deleteById, getAll } from '../../../Services/foodService';
import { Link } from 'react-router-dom';

export default function FoodAdmin() {
  const [foods, setFoods] = useState();

  useEffect(() => {
    loadFoods();
  });

  const loadFoods = async () => {
    const foods = await getAll();
    setFoods(foods);
  };

  const delFood = async food => {
    const conf = window.confirm("Are you sure?");
    if (!conf) return;

    await deleteById(food.id);
    setFoods(foods.filter( f => f.id !== food.id));
  };

  return (
    <div className={classes.container}>
      <div className={classes.list}>
        <Link to='/foodadd' className={classes.addfood}>
          Add
        </Link>
        {
          foods && foods.map (food => 
            <div key={food.id} className={classes.foodlist}>
              <img src={food.image} alt={food.name}/>
              <div>{food.name}</div>
              <div>Tk.{food.price}</div>
              <div className={classes.actions}>
                <Link to={`/foodadd/${food.id}`}>Edit</Link>
                &nbsp;
                <Link onClick={() => delFood(food)}>Delete</Link>
              </div>

            </div>)
        }
      </div>
    </div>
  )
}
