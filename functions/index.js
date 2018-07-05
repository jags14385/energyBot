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

var username = request.body.queryResult.parameters['username'][0].toLocaleLowerCase();
var device = request.body.queryResult.parameters['device'][0];

if ( username !== null && device !== null) {
    console.log("INFO :: ", username , device );
}

var query = db.collection('users').where('username','==',`${username}`);

query.get().then(snapshot => {
    snapshot.forEach( doc => {
        if(doc.exists) {
          console.log(doc.id, '=>', doc.data());
        } else {
          console.log('no doc exits');
        }
    })
  }).catch((err) => {
    console.log('Error getting documents', err);
  });

  responseText = username + device ;
  response.setHeader('Content-Type', 'application/json');
  response.send(JSON.stringify({fulfillmentText:  responseText}));
 });
