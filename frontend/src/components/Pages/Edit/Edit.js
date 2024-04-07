import { useForm } from 'react-hook-form';
import classes from './Edit.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { add, getById, update } from '../../../Services/foodService';
import InpContainer from '../../InputContainer/inputContainer';
import Input from '../../Input/Input';
import { uploadImage } from '../../../Services/uploadService';

export default function Edit() {
    const {foodId} = useParams();
    const [image, setImageUrl] = useState();
    const EditMode = !!foodId;
    const navigate = useNavigate();

    const {
        handleSubmit,
        register,
        formState: {errors},
        reset
    } = useForm();

    useEffect(() => {
        if (!EditMode) return;

        getById(foodId).then( food => {
            if (!food) return;
            reset(food);
            setImageUrl(food.image);
        });

    }, [foodId]);

    const submit = async foodData => {
      const food = {...foodData, image};

      if(EditMode) {
        await update(food);
        return;
      }

      const newFood = await add(food);
      navigate('/foodadd/'+newFood.id, {replace: true});

    };

    const upload = async event => {
        setImageUrl(null);
        const image = await uploadImage(event);
        setImageUrl(image);
    };

  return (
    <div className={classes.container}>
        <div className={classes.content}>
        <form className={classes.form} onSubmit={handleSubmit(submit)} noValidate>
            <InpContainer label="Select Image">
                <input type='file' onChange={upload} accept='image/jpeg, image/png'/>
            </InpContainer>

            <img src={image} alt='Upload ' />

            <Input
            type="text"
            label="Name"
            {...register('name', { required: true})}
            error={errors.name}
          />

          <Input
            type="number"
            label="Price"
            {...register('price', { required: true })}
            error={errors.price}
          />

          <Input
            type="text"
            label="Tags"
            {...register('tags')}
            error={errors.tags}
          />

           <Input
            type="text"
            label="Description"
            {...register('description')}
            error={errors.description}
          />
          <div className={classes.buttonContainer}>
          <button type="submit">{EditMode ? 'Update' : 'Create'}</button>
          </div>
        </form>
        </div>
    </div>
  )
}
