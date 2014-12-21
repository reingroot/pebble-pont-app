var Vector2 = require('vector2');
var UI = require('ui');

var route = {
  departure: '',
  arrival: ''
};

var singleRoutes = {
  Buiksloterweg: 'Centraal Station',
  IJplein: 'Centraal Station',
  Tasmanstraat: 'NDSM-werf',
  Distelweg: 'Tasmanstraat',
  Azartplein: 'Zamenhofstraat',
  Zamenhofstraat: 'Azartplein'
};

/**
 * Define the menus
 */

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
      title: 'Buiksloterweg'
    }, {
      title: 'NDSM-werf'
    }, {
      title: 'IJplein'
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

mainMenu.show();

// Main menu select handler
mainMenu.on('select', function (e) {
  console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
  console.log('The item is titled "' + e.item.title + '"');
  
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

// Show the departure times for the chosen ferry stop
function showTimes () {
  var title = route.departure + '\n' + route.arrival;
  
  //var times = getTimes();
  var wind = new UI.Window();
  var textEl = new UI.Text({position: new Vector2(0, 0), size: new Vector2(144, 168), textAlign: 'center', text: title});
  
  wind.add(textEl);
  
  wind.show();
  
  countdown(wind, 5, 30);
}

// Get the departure times from the Pont App API
function getTimes (departure) {
  
}

function countdown(wind, minutes, seconds )
{
  var endTime, hours, mins, msLeft, time, currentCount, el;

  function twoDigits( n )
  {
    return (n <= 9 ? "0" + n : n);
  }

  function updateTimer()
  {
    msLeft = endTime - (+new Date());
    if ( msLeft < 1000 ) {
      //
    } else {
      time = new Date( msLeft );
      hours = time.getUTCHours();
      mins = time.getUTCMinutes();
      currentCount = (hours ? hours + ':' + twoDigits( mins ) : mins) + ':' + twoDigits( time.getUTCSeconds() );
      
      // If this element exists remove it
      if (el && el.index()) {
        el.remove();
      }
      
      el = new UI.Text({position: new Vector2(0, 100), size: new Vector2(144, 168), font: 'Bitham-30-Black', textAlign: 'center', text: currentCount});
      
      wind.add(el);
      
      setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
    }
  }

  endTime = (+new Date()) + 1000 * (60*minutes + seconds) + 500;
  updateTimer();
}

//countdown( "countdown", 1, 5 );
//countdown( "countdown2", 100, 0 );