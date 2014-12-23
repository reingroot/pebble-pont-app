var Vector2 = require('vector2');
var UI = require('ui');
var gettimes = require('gettimes');
var getTimeDifference = require('gettimedifference');
var Countdown = require('Countdown');

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

// Object for the timer objects
var timers = {};

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
  action: {
    select: 'images/rotate-route.png'
  }
});
// Make sure the window is only initialized once
timeWind.init = false;

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
  
  var title = route.departure + '\n' + route.arrival;
  var titleEl = titleEl || new UI.Text({position: new Vector2(0, 0), size: new Vector2(144, 168), textAlign: 'center', text: title});
    
  var currentCountdown = new UI.Text({position: new Vector2(0, 60), size: new Vector2(144, 168), font: 'bitham-30-black', textAlign: 'center'});
  var nextCountdown = new UI.Text({position: new Vector2(0, 100), size: new Vector2(144, 168), font: 'gothic-24-bold', textAlign: 'center'});

  // Add the countdown timers to the text elements
  timeWind.timers = timeWind.timers || createCountdownTimers(timeWind, currentCountdown, nextCountdown);

  // Set the handlers only once
  if (! timeWind.init) {
    
    // Add the title text element to the window
    timeWind.add(titleEl);
    timeWind.titleEl = titleEl;
    
    // Add the countdown text elements to the window
    timeWind.add(currentCountdown);
    timeWind.add(nextCountdown);
    
    // Countdown window route rotate handler
    timeWind.on('click', 'select', function (e) {
      var currentArrival, currentDeparture, times, currentTimes, nextTimes;
  
      // Store the current ferry stops
      currentDeparture = route.departure;
      currentArrival = route.arrival;
  
      // Rotate the direction of this route
      route.departure = currentArrival;
      route.arrival = currentDeparture;
  
      // Update the route title
      this.titleEl.text(route.departure + '\n' + route.arrival);
      
      // Get the next two departure times for this route
      times = gettimes(route.departure, route.arrival);
      
      currentTimes = getTimeDifference(times['1'].hours, times['1'].minutes, times['1'].seconds);
      nextTimes = getTimeDifference(times['2'].hours, times['2'].minutes, times['2'].seconds);
      
      this.timers.current.resetTimer(currentTimes.min, currentTimes.sec);
      this.timers.next.resetTimer(nextTimes.min, nextTimes.sec);
    });
  
    // Remove the title element when this window is closed
    timeWind.on('click', 'back', function () {
      this.titleEl.text('');
      this.timers.current.endTimer();
      this.timers.next.endTimer();
      
      this.hide();
    });
    
    timeWind.init = true;
  } else {
    
    // Update the route title
    timeWind.titleEl.text(route.departure + '\n' + route.arrival);

    // Get the next two departure times for this route
    var times = gettimes(route.departure, route.arrival);

    var currentTimes = getTimeDifference(times['1'].hours, times['1'].minutes, times['1'].seconds);
    var nextTimes = getTimeDifference(times['2'].hours, times['2'].minutes, times['2'].seconds);

    timeWind.timers.current.resetTimer(currentTimes.min, currentTimes.sec);
    timeWind.timers.next.resetTimer(nextTimes.min, nextTimes.sec);
  }
  
  // Show the window
  timeWind.show();
}

function createCountdownTimers (wind, currentCountdownEl, nextCountdownEl) {
  var currentCountdownObj, nextCountdownObj, times, currentTimes, nextTimes;
  
  // Get the next two departure times for this route
  times = gettimes(route.departure, route.arrival);
  
  currentTimes = getTimeDifference(times['1'].hours, times['1'].minutes, times['1'].seconds);
  nextTimes = getTimeDifference(times['2'].hours, times['2'].minutes, times['2'].seconds);
   
  // Create the countdown timers
  currentCountdownObj = new Countdown(wind, currentCountdownEl, currentTimes.min, currentTimes.sec, resetCountdownTimers);
  nextCountdownObj = new Countdown(wind, nextCountdownEl, nextTimes.min, nextTimes.sec, resetCountdownTimers);
  
  return {
    current: currentCountdownObj,
    next: nextCountdownObj
  };
}

function resetCountdownTimers () {
  
}

function endCountdownTimers () {
  
}