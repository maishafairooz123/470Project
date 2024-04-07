import { connect, set } from 'mongoose';
import { UserModel } from '../models/user.model.js';
import { sample_foods, sample_users } from '../data.js';
import { FoodModel } from '../models/food.model.js';

set('strictQuery', true);

export const dataconnect = async () => {
    try {
        connect(process.env.MONGO_URI, {});
        await seedUsers();
        await seedFoods(); 

        console.log('Connected Successfully');
    }
    catch (error) {
        console.log(error);
    }
};

async function seedUsers() {
    const userCount = await UserModel.countDocuments();

    if (userCount > 0) {
        console.log('User Seeding Already Done');
        return;
    }

    for (let user of sample_users) {
        await UserModel.create(user);
    }

    console.log("User Seeding Completed")
}

async function seedFoods() {
    const foods = await FoodModel.countDocuments();
    if (foods > 0) {
        console.log('Food Seeding Already Done');
        return;
    }

    for (let food of sample_foods) {
        food.image = `/foods/${food.image}`;
        await FoodModel.create(food);
    }

    console.log("Food Seeding Completed")
}