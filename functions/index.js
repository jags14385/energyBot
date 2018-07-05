const functions = require('firebase-functions');

exports.helloWorld = functions.https.onRequest((request, response) => {
   
console.log("REQUEST :: ", JSON.stringify(request.body));

switch (request.queryResult.queryText){
    case "100kwh":
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify({"fulfillmentText": "Response for 100kwh" }));
            break;

    case "600kwh":
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify({"fulfillmentText": "Response for 600kwh" }));
            break;

     default:
            response.setHeader('Content-Type', 'application/json');
            response.send(JSON.stringify({"fulfillmentText": "Default Response" }));
}
    
//response.setHeader('Content-Type', 'application/json');
//response.send(JSON.stringify({"fulfillmentText": "Hai Chai Hooli" }));
 });
