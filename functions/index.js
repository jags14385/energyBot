const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

var db = admin.firestore();

exports.helloWorld = functions.https.onRequest((request, response) => {

    console.log("REQUEST :: ", JSON.stringify(request.body));
    var responseText, avgCost;

    var energyConsumption = request.body.queryResult.parameters['annual-energy-consumption'];

    if (energyConsumption !== null) {
        avgCost = energyConsumption / 4;
        responseText = "Avg Cost for appliance per year is : " + avgCost;
    }

    var username = request.body.queryResult.parameters['username'][0].toLocaleLowerCase();

    var query = db.collection('users').where('username', '==', `${username}`);
    var consumption,consumption1,consumption2;
    var dishWasherSpec, refrigatorSpec;

    var p1 = query.get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            if (doc.exists) {
                console.log(doc.id, '=>', doc.data());

                dishWasherSpec = doc.data()['dishwasher'];
                refrigatorSpec = doc.data()['fridge'];

                console.log("Dishwasher: ",dishWasherSpec);
                console.log("Fridge: ", refrigatorSpec);
                console.log("Dpsec: " ,dishWasherSpec.split('-'));
                console.log("RSpec: ", refrigatorSpec.split('-'));
            } else {
                console.log('no doc exits');
            }
        })
    })
    .then(() => {
        return db.collection('fridge').get().then(snap => {
            snap.forEach(docu => {
                console.log(docu.id, '=====>', docu.data());
                var fridgeModel = refrigatorSpec.split('-')[1];
                console.log(fridgeModel);
                console.log(docu.data()[fridgeModel]);
                consumption1 = docu.data()[fridgeModel];
                console.log("fridge Consumption ::", consumption1)
            });
        });
    })
    .then(() => {
        return db.collection('washer').get().then(snap => {
            snap.forEach(docu => {
                console.log(docu.id, '=====>', docu.data());
                var dishWasherModel = dishWasherSpec.split('-')[1];
                console.log(dishWasherModel);
                console.log(docu.data()[dishWasherModel]);
                consumption2 = docu.data()[dishWasherModel];
                console.log("washer Consumption ::", consumption2)
            });
        });
    })
    .then(() => {
        consumption = consumption1 + consumption2 ;
        responseText = "For User: " +username + " The approx annual energy costs is : " + ( consumption/4 );
        console.log(responseText);
        response.setHeader('Content-Type', 'application/json');
        response.send(JSON.stringify({
            fulfillmentText: responseText ,
            speech: responseText
        })
    );    
});
});