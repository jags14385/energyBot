const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

var db = admin.firestore();

exports.helloWorld = functions.https.onRequest((request, response) => {
   
console.log("REQUEST :: ", JSON.stringify(request.body));
var responseText , avgCost;

var energyConsumption = request.body.queryResult.parameters['annual-energy-consumption'];

if (energyConsumption !== null ) {
    avgCost = energyConsumption / 4 ;
    responseText = "Avg Cost for appliance per year is : " + avgCost;
}

var username = request.body.queryResult.parameters['username'];
var device = request.body.queryResult.parameters['device'];

if ( username !== null && device !== null) {
    console.log("ROC:: IINFIOIIIIII ", username , device );
}

console.log("USERRRRRRRR: ", username);

var query = db.collection("users") .where("username", "==", "ori") 

query.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

    responseText = username + device ;
    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify({"fulfillmentText":  responseText}));
    console.log("RESPONSE :: ", response);
    
 });
