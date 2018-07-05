const functions = require('firebase-functions');

exports.helloWorld = functions.https.onRequest((request, response) => {
   
console.log("REQUEST :: ", request);
    
response.setHeader('Content-Type', 'application/json');
response.send(JSON.stringify({"fulfillmentText": "Hai Chai Hooli" }));
 });
