import { Router } from 'express';
import handler from 'express-async-handler';
import auth from '../middleware/auth.mid.js';
import admin from '../middleware/admin.mid.js';
import { BAD_REQUEST, UNAUTHORIZED } from '../constants/httpStatus.js';
import { OrderModel } from '../models/order.model.js';
import { OrderStatus } from '../constants/orderStatus.js';
import { UserModel } from '../models/user.model.js';
import { OrderItemStatus } from '../constants/orderItemStatus.js';

const router = Router();
router.use(auth);

router.post(
  '/create',
  handler(async (req, res) => {
    const order = req.body;

    if (order.items.length <= 0) res.status(BAD_REQUEST).send('Cart Is Empty!');

    await OrderModel.deleteOne({
      user: req.user.id,
      status: OrderStatus.NEW,
    });

    const newOrder = new OrderModel({ ...order, user: req.user.id });
    await newOrder.save();
    res.send(newOrder);
  })
);

  router.get(
    '/track',
    handler(async (req, res) => {
      const user = await UserModel.findById(req.user.id);
  
      const filter = {
        user: user._id,
        status: { $ne: OrderStatus.COMPLETED },
      };
      
      const order = await OrderModel.findOne(filter);

      if(order) {
        const allItemsServed = order.items.every(item => item.status === 'SERVED');
        if(allItemsServed) {
          order.status = OrderStatus.SERVED;
          await order.save();
        }
        else {
          if(order.status != OrderStatus.NEW) {
            order.status = OrderStatus.RUNNING;
          }
          await order.save();
        }
      }
  
      if (!order) return res.send();
  
      return res.send(order);
    })
  );

  router.post(
    '/completeorder',
    handler(async (req, res) => {
      const user = await UserModel.findById(req.user.id);
  
      const filter = {
        user: user._id,
        status: { $ne: OrderStatus.COMPLETED },
      };
      
      const order = await OrderModel.findOne(filter);
  
      if (!order) return res.send();

      order.status = OrderStatus.COMPLETED;

      await order.save();
  
      return res.send(order);
    })
  );

  router.get(
    '/refresh/:orderId',
    handler(async (req, res) => {
      const user = await UserModel.findById(req.user.id);
      const { orderId } = req.params;

      const filter = {
        _id: orderId,
      };
      
      const order = await OrderModel.findOne(filter);
      if (!order) return res.send(UNAUTHORIZED);

      const allItemsServed = order.items.every(item => item.status === 'SERVED');
      if(allItemsServed) {
        order.status = OrderStatus.SERVED;
        await order.save();
      }
      else {
        if(order.status != OrderStatus.NEW) {
          order.status = OrderStatus.RUNNING;
        }
        await order.save();
      }

      return res.send(order);
    })
  );

  router.get(
    '/trackbyid/:orderId',
    admin,
    handler(async (req, res) => {
      const { orderId } = req.params;
      const filter = {
        _id: orderId,
      };
  
      const order = await OrderModel.findOne(filter);

      const allItemsServed = order.items.every(item => item.status === 'SERVED');
      if(allItemsServed) {
        order.status = OrderStatus.SERVED;
        await order.save();
      }
      else {
        if(order.status != OrderStatus.NEW) {
          order.status = OrderStatus.RUNNING;
        }
        await order.save();
      }
  
      if (!order) return res.send(UNAUTHORIZED);
  
      return res.send(order);
    })
  );

  router.put(
    '/approveorder/:orderId',
    admin,
    handler(async (req, res) => {
      const { orderId } = req.params;
      const filter = {
        _id: orderId,
      };
  
      const order = await OrderModel.findOne(filter);
  
      if (!order) return res.send({approved: false});

      order.status = OrderStatus.RUNNING;

      await order.save();
  
      return res.send({approved: true});
    })
  );

  router.put(
    '/serveitem/:orderId/:itemFoodId',
    admin,
    handler(async (req, res) => {
      const { orderId, itemFoodId } = req.params;
      const filter = {
        _id: orderId,
      };

      const order = await OrderModel.findOne(filter);

      const itemIndex = order.items.findIndex(item => item.food._id == itemFoodId);
  
      if (itemIndex == -1) return res.send({served: false});

      order.items[itemIndex].status = OrderItemStatus.SERVED;

      await order.save();
  
      return res.send({served: true});
    })
  );


  router.put(
    '/pay',
    handler(async (req, res) => {
      const { paymentId } = req.body;

      const user = await UserModel.findById(req.user.id);
      const filter = {
        user: user._id,
        status: { $ne: OrderStatus.COMPLETED },
      };
      const order = await OrderModel.findOne(filter);

      if (!order) {
        res.status(BAD_REQUEST).send('Order Not Found!');
        return;
      }
  
      order.paymentId = paymentId;
      order.status = OrderStatus.COMPLETED;
      await order.save();
  
      //sendEmailReceipt(order);
  
      res.send(order._id);
    })
  );

  router.get(
    '/:status?',
    handler(async (req, res) => {
      const status = req.params.status;
      const user = await UserModel.findById(req.user.id);
      const filter = {};

      if (!user.admin) filter.user = user._id;
      if (status) filter.status = status;

      const orders = await OrderModel.find(filter).sort('-createdAt');
      res.send(orders);
    })
  );

export default router;