const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

var db = admin.firestore();

exports.helloWorld = functions.https.onRequest((request, response) => {
   
console.log("REQUEST :: ", JSON.stringify(request.body));

var energyConsumption = request.body.queryResult.parameters['annual-energy-consumption'];
var avgCost = energyConsumption / 4 ;
var responseText = "Avg Cost for appliance per year is : " + avgCost;

db.collection('Refrigator').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log("DOC::: :",doc.id, '=>', doc.data());
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });

    console.log("RESPONSE :: ", JSON.stringify(response.body));
    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify({"fulfillmentText":  responseText}));
    
 });
