var Vector2 = require('vector2');
var UI = require('ui');
var gettimes = require('gettimes');
var getTimeDifference = require('gettimedifference');
var countdown = require('countdown');

// Object to store the current route
var route = {
  departure: '',
  arrival: ''
};

// Object of ferry departures that only have one destination
var singleRoutes = {
  Buiksloterweg: 'Centraal Station',
  IJplein: 'Centraal Station',
  Tasmanstraat: 'NDSM-werf',
  Distelweg: 'Tasmanstraat',
  Azartplein: 'Zamenhofstraat',
  Zamenhofstraat: 'Azartplein'
};

/**
 * Menus
 ==============================================*/

// Main menu with all departure stops
var mainMenu = new UI.Menu({
  sections: [{
    title: 'Vertrek vanaf',
    items: [{
      title: 'Centraal Station',
      subtitle: '3 routes'
    }, {
      title: 'Buiksloterweg'
    }, {
      title: 'NDSM-werf',
      subtitle: '2 routes'
    }, {
      title: 'IJplein'
    }, {
      title: 'Tasmanstraat'
    }, {
      title: 'Distelweg'
    }, {
      title: 'Azartplein'
    }, {
      title: 'Zamenhofstraat'
    }]
  }]
});

// Central Station to ...
var centralMenu = new UI.Menu({
  sections: [{
    title: 'Centraal Station naar',
    items: [{
      title: 'Buiksloterweg',
      //subtitle: '> 5:30'
    }, {
      title: 'NDSM-werf',
      //subtitle: '> 4:23'
    }, {
      title: 'IJplein',
      //subtitle: '> 2:40'
    }]
  }]
});

// NDSM warf to ...
var ndsmMenu = new UI.Menu({
  sections: [{
    title: 'NDSM-werf naar',
    items: [{
      title: 'Centraal Station'
    }, {
      title: 'Tasmanstraat'
    }]
  }]
});

// The window showing the time countdown for the chosen route
var timeWind = new UI.Window({
  //action: {
  //  select: 'images/rotate-route.png'
  //}
});

mainMenu.show();

/**
 * Action handlers
 ==================================================*/

// Main menu select handler
mainMenu.on('select', function (e) {
  
  // Set the departure station
  route.departure = e.item.title;
  
  // Determine either to show a sub-menu of arrivals or show the departure times
  switch (e.item.title) {
      
    case 'Centraal Station':
      centralMenu.show();
      break;
      
    case 'NDSM-werf':
      ndsmMenu.show();
      break;
      
    default:
      route.arrival = singleRoutes[route.departure];
      showTimes(e);      
  }
});

// Central Station menu select handler
centralMenu.on('select', function (e) {
  route.arrival = e.item.title;
  showTimes();      
});

// NDSM-warf menu select handler
ndsmMenu.on('select', function (e) {
  route.arrival = e.item.title;
  showTimes();      
});

/**
 * @desc Show the departure times for the chosen ferry stop
 */
function showTimes () {
  
  var title = route.departure + '\n' + route.arrival,
      textEl = new UI.Text({position: new Vector2(0, 0), size: new Vector2(144, 168), textAlign: 'center', text: title});
  
  // Add the title text element to the window
  timeWind.add(textEl);
  
  // Set the countdown
  setCountdown(timeWind);
  
  // Show the window
  timeWind.show();
}

function setCountdown (wind) {
  var 
      // Get the next two departure times for this route
      times = gettimes(route.departure, route.arrival),
      currentTimes = getTimeDifference(times['1'].hours, times['1'].minutes, times['1'].seconds),
      nextTimes = getTimeDifference(times['2'].hours, times['2'].minutes, times['2'].seconds);
   
  // Create the countdown timers
  countdown(wind, 'currentDeparture', currentTimes.min, currentTimes.sec, setCountdown);
  countdown(wind, 'nextDeparture', nextTimes.min, nextTimes.sec, setCountdown);
}