var ajax = require('ajax');

function gettimes (location, destination) {
  var response;
  
  ajax(
    {
      url: 'http://pontveer.nl/api/?l=' + encodeURI(location) + '&d=' + encodeURI(destination) + '&platform=Pebble',
      type: 'json',
      async: false
    },
    function(data) {
      response = data.departures;
    },
    function(error) {
      console.log('The ajax request failed: ' + error);
      response = undefined;
    }
  );
  
  return response;
}

module.exports = gettimes;