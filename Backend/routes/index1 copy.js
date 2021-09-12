const express = require('express'); //Cargar framework de nodejs
const router = express.Router(); //Cargar nucleo router

//Import payouts controller
const paypal_controller = require ('../controllers/paypal.controller.js');

module.exports = function(){

    //These are your routes and they get the functionality of the assigned controller
    //Your routes look like this eg: http://localhost:2777/api/paypal/paypal-new-checkout
    router.get('/paypal-token', paypal_controller.generateTokenPaypal);
    router.post('/paypal-new-checkout', paypal_controller.generatePayoutPaypal);

    return router;
}