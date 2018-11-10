const {BasicCard, Image, SimpleResponse, List} = require('actions-on-google');

let simpleResponse = (conv, speech, text) => {
  console.log("simple response module");
  conv.ask(new SimpleResponse({
      speech: speech,
      text: text,
  }));
}

let basicCard = (conv, item, speech, text) => {
  simpleResponse(conv, speech, text);
  conv.ask(new BasicCard({
    text: item.description,
    subtitle: item.theme,
    title: item.name,
    image: new Image({
    url: item.photo,
    alt: item.name,
    }),
    display: 'WHITE',
  }));
}

let showList = (conv, list) => {
  conv.ask(new List(list));
}

module.exports.simpleResponse = simpleResponse;
module.exports.basicCard = basicCard;
module.exports.showList = showList;