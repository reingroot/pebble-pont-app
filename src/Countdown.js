/**
 * @desc Countdown constructor
 */
var Countdown = function (wind, textEl, minutes, seconds, callback) {
  this.timeoutID = undefined;
  this.endTime = undefined;
  
  this.wind = wind;
  this.textEl = textEl;
  
  this.endTime = (+new Date()) + 1000 * (60*minutes + seconds) + 500;
  this._startTimer(callback);
};

/**
 * @desc stop the timer, remove the element
 */
Countdown.prototype.endTimer = function () {
  clearTimeout(this.timeoutID);
  this.textEl.text('');
};

/**
 * @desc reset the timer with a new time
 */
Countdown.prototype.resetTimer = function (minutes, seconds) {
  this.endTimer();
  
  this.endTime = (+new Date()) + 1000 * (60*minutes + seconds) + 500;
  
  this._startTimer();
};

/**
 * @desc update the timer for this countdown
 */
Countdown.prototype._startTimer = function (zeroTimeCallback)
{
  var that = this;
  
  this.zeroTimeCallback = this.zeroTimeCallback || zeroTimeCallback;
  
  function updateTimer () {
    var time, msLeft, mins, currentCount;
    
    msLeft = that.endTime - (+new Date());
    
    if ( msLeft < 1000 ) {
      that.endTimer();
  
      // Call this function when the timer runs out
      that.zeroTimeCallback(that.wind);
    } else {
      time = new Date( msLeft );
      mins = time.getUTCMinutes();
      currentCount = mins + ':' + that._twoDigits( time.getUTCSeconds() );
  
      that.textEl.text(currentCount);
  
      that.timeoutID = setTimeout( updateTimer, time.getUTCMilliseconds() + 500 );
    }
  }
  
  // Run the timer
  updateTimer();
};

/**
 * @desc Padd single digits with a zero
 */
Countdown.prototype._twoDigits = function ( n )
{
  return (n <= 9 ? "0" + n : n);
};


module.exports = Countdown;