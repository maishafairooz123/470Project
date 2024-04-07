import { Router } from "express";
import handler from 'express-async-handler';
import { FoodModel } from "../models/food.model.js";

const router = Router();
router.get('/', handler(async (req, res) =>{
    const foods = await FoodModel.find({})
    res.send(foods);
})
);

router.post('/', handler(async (req, res) => {
    const { name, price, tags, description, image} = req.body;
    
    const food = new FoodModel({
        name,
        price,
        tags: tags.split ? tags.split(',') : tags,
        description,
        image,
    });
    await food.save();

    res.send(food);
})
);

router.put('/', handler(async (req, res) => {
    const {id, name, price, tags, description, image} = req.body;
    await FoodModel.updateOne({_id: id}, {
        name,
        price,
        tags: tags.split ? tags.split(',') : tags,
        description,
        image,
    });
    res.send();
})
);

router.delete('/:foodId', handler( async (req, res) => {
    const{foodId} = req.params;
    await FoodModel.deleteOne({_id: foodId});
    res.send();
}));

router.get('/search/:searchTerm', handler(async (req, res) => {
    const{searchTerm} = req.params;
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const foods = await FoodModel.find({
        $or: [
            { name: { $regex: lowerCaseSearchTerm, $options: 'i' } }, 
            { tags: { $regex: lowerCaseSearchTerm, $options: 'i' } }
    ]});
    res.send(foods);
})); 

router.get(
    '/:foodId',
    handler(async (req, res) => {
      const { foodId } = req.params;
      const food = await FoodModel.findById(foodId);
      res.send(food);
    })
  );

export default router;