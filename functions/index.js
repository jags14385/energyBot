const functions = require('firebase-functions');

exports.helloWorld = functions.https.onRequest((request, response) => {
   
console.log("REQUEST :: ", JSON.stringify(request.body));

var energyConsumption = request.body.queryResult.parameters['annual-energy-consumption'];
var avgCost = energyConsumption / 4 ;
var responseText = "Avg Cost for appliance per year is : " + avgCost;

response.setHeader('Content-Type', 'application/json');
response.send(JSON.stringify({"fulfillmentText":  responseText}));
 });
