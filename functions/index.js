'use strict';
let speakers = require('./speakers');

// Import the Dialogflow module from the Actions on Google client library.
const {dialogflow} = require('actions-on-google');

const admin = require('firebase-admin');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

const serviceAccount = require('./key/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://gdg-lead.firebaseio.com'
});

const db = admin.database();

// Speakers questions
speakers.speakersQuestions(app, db);

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);