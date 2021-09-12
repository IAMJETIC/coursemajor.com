const express = require('express');
const orderRouter = express.Router();
const Order = require('../models/orderModel.js');
const User = require('../models/Users.js');
const Courses = require('../models/courses.js');
const { isAuth } = require('../utils/utils.js');

//import expressAsyncHandler from 'express-async-handler';


orderRouter.post('/',
isAuth,
  async (req, res) => {
      //If req.user.id is = seller.id then hacker ==true
      const order = new Order({
        orderItems: req.body.orderItems,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        seller: req.body.seller,
        user: req.user._id,
      });
      const createdOrder = await order.save();
      const UserId = req.user._id;
      const CourseId = req.body.orderItems[0].course

      const course = await Courses.findOne({_id: CourseId});
      const user = await User.findOne({_id: UserId});

      if (req.body.itemsPrice==course.price) {
        user.updateBalance(course.price);
        await user.save();
      } else {
        user.hackerAlert();
      }

      res.status(201).send({ message: 'New Order Created', order: createdOrder });
    }
);

orderRouter.get('/:CourseId', 
  isAuth, 
  async (req, res) => {
    const CourseId = req.params.CourseId;

      try {
        const Orders = await Order.find({ user: req.user._id });

        let courseId=[];
        Orders.forEach(item => { 
          courseId.push(item.orderItems[0].course);
        });
        
        let pos = function(element, index, theArray){
          //console.log(element + " - " + index);
          return element == CourseId;
        }

        const courseIndex = courseId.findIndex(pos);

        if (courseIndex>=0) {
          res.json(Orders[courseIndex]);
        } else {
          res.send(false);
        }
        
      } catch (err) {
        res.json({ message: err });
      }
});

module.exports = orderRouter;