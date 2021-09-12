//import jwt from 'jsonwebtoken';
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

exports.isAuth = async(req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    console.log(token);
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
          console.log("Not work")
        } else {
          req.user = decode;
          console.log(`This is decode ${decode}`);
          console.log(`This is req.user ${req.user}`);
          console.log(req.user);
          next();
        }
      }
      );
    } else {
      console.log("No Token");
      res.status(401).send({ message: 'No Token' });
    }
  };
  
  exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401).send({ message: 'Invalid Admin Token' });
    }
  };
  
  exports.isSeller = (req, res, next) => {
  if (req.user && req.user.isSeller) {
    next();
  } else {
    res.status(401).send({ message: 'Invalid Seller Token' });
  }
};

exports.isSellerOrAdmin = (req, res, next) => {
  if (req.user && (req.user.isSeller || req.user.isAdmin)) {

    next();
  } else {
    res.status(401).send({ message: 'Invalid Admin/Seller Token' });
  }
};