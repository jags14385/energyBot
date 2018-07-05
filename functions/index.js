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

console.log("USER 139: ", username);

var query = db.collection('werty');

query.get().then(snapshot => {
    snapshot.forEach(doc => {
      console.log('iqwrgigeigruig',doc.id, '=>', doc.data());
    }).catch(function(error) {
    console.log("Error getting document:", error);
});

});

    responseText = username + device ;
    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify({"fulfillmentText":  responseText}));    
 });
