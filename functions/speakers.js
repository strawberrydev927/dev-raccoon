const {Image} = require('actions-on-google');
let cards = require('./cards');

let findSpeaker = (app, speakers, currentSpeaker) => {
  app.intent('find speaker', (conv, {speakerName}) => {
    for (let speaker in speakers) {
      if (speakers[speaker].name === speakerName) {
        currentSpeaker = speakers[speaker];
      }
    }
    let speech = 'Here are some information about: ' + currentSpeaker.name;
    let display = 'Here are some information about: ' + currentSpeaker.name;
    cards.basicCard(
      conv, 
      currentSpeaker, 
      speech, 
      display, 
      currentSpeaker.description, 
      currentSpeaker.theme, 
      currentSpeaker.name, 
      currentSpeaker.photo, 
      currentSpeaker.name
    );
  });
}

let speakersList = (app, speakers, speakers_list) => {
  app.intent('speakers list', (conv) => {
    for (let speaker in speakers) {
      let speaker_key = "SPEAKER_KEY_" + speaker;
      speakers_list.items[speaker_key] = {
        synonyms: [
          speakers[speaker].name
        ],
        title: speakers[speaker].name,
        description: speakers[speaker].description,
        image: new Image({
          url: speakers[speaker].photo,
          alt: speakers[speaker].name,
        }),      
      };
    }
    conv.ask('Here is a speakers list.');
    // Create a list
    cards.showList(conv, speakers_list)
  });
}

let selectSpeaker = (app, speakers, SELECTED_ITEM_RESPONSES) => {
  app.intent('item selected', (conv, params, option) => {
    let response = 'You did not select any item from the list or carousel';
    // Generate selection keys based on data length
    for (let speaker in speakers) {
      SELECTED_ITEM_RESPONSES['SPEAKER_KEY_' + speaker] = speaker;
    }
    if (option && SELECTED_ITEM_RESPONSES.hasOwnProperty(option)) {
      let speaker_key = SELECTED_ITEM_RESPONSES[option];
      let speech = 'Here are some information about: ' + speakers[speaker_key].name;
      let display = 'Here are some information about: ' + speakers[speaker_key].name;
      cards.basicCard(
        conv, 
        speakers[speaker_key], 
        speech, 
        display,
        speakers[speaker_key].description, 
        speakers[speaker_key].theme, 
        speakers[speaker_key].name, 
        speakers[speaker_key].photo, 
        speakers[speaker_key].name
      );
    } else {
      response = 'You selected an unknown item from the list or carousel';
      conv.ask(response);
    }
  });
}

let speakersQuestions = (app, db) => {

  let speakers = {};
  let currentSpeaker = {};
  let speakers_list = {
    title: 'Speakers',
    items: {}
  };
  // Constants for selected item responses
  const SELECTED_ITEM_RESPONSES = {};

  const ref = db.ref("Speakers");
  ref.once("value", function(snapshot) {
    speakers = snapshot.val();
    // console.log("speakers devfest: " + JSON.stringify(speakers));
    findSpeaker(app, speakers, currentSpeaker);
    speakersList(app, speakers, speakers_list);
    selectSpeaker(app, speakers, SELECTED_ITEM_RESPONSES)
  });
};

module.exports.speakersQuestions = speakersQuestions;