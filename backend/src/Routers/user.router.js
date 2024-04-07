import { Router } from "express";
import tkn from 'jsonwebtoken';
import handler from 'express-async-handler';
import { UserModel } from "../models/user.model.js";
import adminMid from "../middleware/admin.mid.js";


const router = Router();

router.post('/login', handler(async (req, res) => {
    const {employee, password} = req.body;
    const user = await UserModel.findOne({employee});

    if (user && password === user.password) {
        res.send(generate(user));
        return;
    }

}));

router.post('/register', handler (async (req, res) => {
    const {name, employee, password} = req.body;

    const user = await UserModel.findOne({employee});

    if (user) {
        res.status(400).send('Employee Already Registered');
        return;
    }

    const newUser = {
        name, 
        employee,
        password,
    };

    const result = await UserModel.create(newUser);
    res.send(generate(result));

}));

router.put(
    '/callwaiter',
    handler (async (req, res) => {
        const {user}  = req.body;
        const userobject = await UserModel.findById(user.id);
        userobject.isCalling = true;
        await userobject.save();
        res.send({notified: true});
    })
)

router.put(
    '/answercaller',
    handler (async (req, res) => {
        const {user}  = req.body;
        const userobject = await UserModel.findById(user.id);
        userobject.isCalling = false;
        await userobject.save();
        res.send({answered: true});
    })
)

router.get(
    '/getpendingcallers',
    handler (async (req, res) => {
        const filter = {
            isCalling: true,
        }
        const userobjects = await UserModel.find(filter);
        
        res.send(userobjects);
    })
)

router.get('/getall', adminMid, handler(async(req, res) => {
        const users = await UserModel.find({});
        res.send(users);
}));

router.put('/:userId', handler(async (req, res) => {
    const { userId } = req.params;
    const { admin } = req.body;


        const updatedUser = await UserModel.findByIdAndUpdate(userId, { admin }, { new: true });
        res.json(updatedUser);
}));

const generate = user => {
    const token = tkn.sign ({
        id: user.id, employee: user.employee, admin: user.admin
    }, process.env.JWT_SECRET);

    return {
        id: user.id,
        employee: user.employee,
        name: user.name,
        admin: user.admin,
        token,


    };
};

export default router;