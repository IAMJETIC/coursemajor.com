'use strict';
//Load files library
var fs = require('fs');
var path = require('path');

const axios = require('axios');//Library to manage complex rest services
const http  = require('https');//Libraries to handle be rest
const uniqid = require('uniqid');//Generate unique ids

//This var is exported as a module for the routes
var controller = {
    
    //Functionality that generates a paypal token
    generateTokenPaypal: async function(req, res ){

      console.log('Route Activated');
      //This data is passed to the auth basic headers to generate the token
      //basic is a complex auth so implement axios to get the data
      //with data destructuring
      //username = clientid, password = secret  
      let username = 'Abss2pgNYLyVb-QVaiovFTxpOA8YP4Gni4Iold7YoESmyaubx1znakSTjXIMRz55-UpW0_cOT8x0e9HG';
      let password = 'EFl7VYSmsmQsWMu7yQcGWBkYDNmjjrM2cHykSz6zNtjEx-5ecSg7I-3gArk6xbGwB25R48_CRu89-_JW';
    
      //Function to request the paypal api
      (async () => {
        try {
          const { data: { access_token, token_type } } = await axios({ //Destruction of data to obtain access_token
            url: 'https://api.sandbox.paypal.com/v1/oauth2/token',//change this url in production https://api.paypal.com
            method: 'post',
            headers: {
              Accept: 'application/json',
              'Accept-Language': 'en_US',
              'content-type': 'application/x-www-form-urlencoded',
            },
            auth: {
              username: username,//you username are you client id
              password: password,//you password are you secret
            },
            params: {
              grant_type: 'client_credentials',
            },
          });
          
          //Return response with token
          return res.status(200).send({
            status : 'success',  
            message: "Your token is:",
            access_token : access_token,
            token_type   : token_type
          });
    
        } catch (error) { 
          console.log('error: ', error);
          
          //Sila petition axios failure
          return res.status(400).send({
            status : 'error',  
            message: "Paypal error, check logs"
          });
    
        }
      })();
    
    },

    generatePayoutPaypal: async function(req, res){

        //Params are the parameters that the request body receives
        let params     = req.body;//here also comes the token
        let mode       = params.mode;//mode must be EMAIL, TELEPHONE, PAYPAL ID
        //Depending on this, the logic of the request will change
        let batch_code = uniqid(); //This code is generated because each request 
        //It asks you to generate a unique invoice number with this library we do it

        //This comes from the paypal doc
        //Important here you must put in authorization: "Bearer" + params.token to put the new token that is generated each 
        //petition
        var options = {
          "method": "POST",
          "hostname": "api.sandbox.paypal.com",
          "port": null,
          "path": "/v1/payments/payouts",
          "headers": {
            "accept": "application/json",
            "authorization": "Bearer A21AALpLQ4Bht427v_LED0iSHRtmwdInNLZBoAVhDLXEJSMw6Mkbb_BwGIMriPsRriuCH8bDCF3bI9Lc21mC-QOMPrHma6-pA",
            "content-type": "application/json"
          }
        };
        
        //Doc payouts paypal
        //Handler from request to your api
        //START REQUEST
        var req = http.request(options, function (res) {
          var chunks = [];
        
          res.on("data", function (chunk) {
            chunks.push(chunk);
          });
        
          res.on("end", function () {
            var body = Buffer.concat(chunks);
            console.log(body.toString());//This prints your answer
          });
        });
        
        //If mode is EMAIL type
        if (mode == 'EMAIL') {
            
            let email          = params.email;//destination
            let amount_to_collect = params.value;//what you will pay

            req.write(JSON.stringify({ sender_batch_header:
                { email_subject: 'Payment made',
                  sender_batch_id: 'batch-'+batch_code },//unicode generate different_ids
               items:
                [ 
                 
                  { recipient_type: 'EMAIL',//currently using
                    amount: { value: amount_to_collect, currency: 'USD' },
                    receiver: email,
                    note: 'Payment from the backend with node, token working'
                  },
                 
                ] }));
             req.end();//END OF REQUEST
             
             //return answer to the front
             return res.status(200).send({
                status : 'success',
                message: "Payment made to: " +email
              });
        }
        //If mode is PHONE type
        if (mode == 'PHONE') {
            
            let phone       = params.phone;
            let amount_to_collect = params.value;

            req.write(JSON.stringify({ sender_batch_header:
                { email_subject: 'Payment made',
                  sender_batch_id: 'batch-'+batch_code },//unicode generate different_ids
               items:
                [ 
                  { recipient_type: 'PHONE',//by phone
                    amount: { value: amount_to_collect, currency: 'USD' },
                    receiver: phone,
                    note: 'User payment by phone',//by email
                    sender_item_id: 'item-1-1589160337416' 
                  },

                ] }));
             req.end();
             
             
             return res.status(200).send({
                status : 'success',
                message: "Payment made to: " + phone
              });
        }
        //If mode is type PAYPAL_ID
        if (mode == 'PAYPAL_ID') {
            
            let paypal_id      = params.paypal_id;
            let amount_to_collect = params.value;

            req.write(JSON.stringify({ sender_batch_header:
                { email_subject: 'Payment made',
                  sender_batch_id: 'batch-'+batch_code },//unicode generate different_ids
               items:
                [ 
                  { recipient_type: 'PAYPAL_ID',//by id paypal
                    amount: { value: amount_to_collect, currency: 'USD' },
                    receiver: paypal_id,
                    note: 'Payment to user by id'}
                ] }));
             req.end();
             
             
             return res.status(200).send({
                status : 'success',
                message: "Payment made to: " + paypal_id
              });
        }
        
    
        
      },

};
//Export for routes
moduleexports = controller;
