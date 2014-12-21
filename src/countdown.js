var UI = require('ui');
var Vector2 = require('vector2');

function countdown(wind, mode, minutes, seconds)
{
  var endTime, hours, mins, msLeft, time, currentCount, el, countdownConfig;

  
  switch (mode) {
    case 'currentDeparture':
      countdownConfig = {
        font: 'Bitham-30-Black',
        position: 60
      };
      break;
      
    case 'nextDeparture':
      countdownConfig = {
        font: 'Bitham-10-Black',
        position: 100
      };
      break;
  }
  
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
      
      el = new UI.Text({position: new Vector2(0, countdownConfig.position), size: new Vector2(144, 168), font: countdownConfig.font, textAlign: 'center', text: currentCount});
      
      wind.add(el);
      
      setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
    }
  }

  endTime = (+new Date()) + 1000 * (60*minutes + seconds) + 500;
  updateTimer();
}

module.exports = countdown;