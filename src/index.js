/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');

var ajax = require('ajax');

ajax(
  {
    url: 'http://pontveer.nl/api/?r=Buiksloterwegveer&l=Buiksloterweg&d=Centraal+Station&app_version=1.1.2&platform=Android&uuid=d43da4804a01f4d&model=HTC+One_M8&version=4.4.4&lat=52.3948212&lon=4.9538242',
    type: 'json'
  },
  function(data) {
    var title = data.route;
    
    var second = new UI.Card({
      title: title,
      icon: 'images/menu_icon.png',
      subtitle: 'Hello World!',
      body: 'Press a button.'
    });
    
    second.show();
  },
  function(error) {
    console.log('The ajax request failed: ' + error);
  }
);


var main = new UI.Card({
  title: 'This is a title',
  icon: 'images/menu_icon.png',
  subtitle: 'Hello World!',
  body: 'Press any button.'
});

main.show();

main.on('click', 'up', function(e) {
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: 'Pebble.js',
        icon: 'images/menu_icon.png',
        subtitle: 'Can do Menus'
      }, {
        title: 'Second Item',
        subtitle: 'Subtitle Text'
      }]
    }]
  });
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
  });
  menu.show();
});

main.on('click', 'select', function(e) {
  var wind = new UI.Window();
  var textfield = new UI.Text({
    position: new Vector2(0, 50),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});
