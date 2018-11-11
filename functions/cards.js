const {BasicCard, Image, SimpleResponse, List} = require('actions-on-google');

let simpleResponse = (conv, speech, display) => {
  // console.log("simple response module");
  conv.ask(new SimpleResponse({
      speech: speech,
      text: display,
  }));
}

let basicCard = (conv, item, speech, display, cardText, subtitle, title, url, alt) => {
  simpleResponse(conv, speech, display);
  conv.ask(new BasicCard({
    text: cardText,
    subtitle: subtitle,
    title: title,
    image: new Image({
    url: url,
    alt: alt,
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