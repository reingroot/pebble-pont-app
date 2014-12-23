/**
 * @desc Countdown constructor
 */
var Countdown = function (wind, textEl, minutes, seconds, callback) {
  this.timeoutID = undefined;
  this.endTime = undefined;
  
  this.wind = wind;
  this.textEl = textEl;
  
  this.endTime = (+new Date()) + 1000 * (60*minutes + seconds) + 500;
  this._updateTimer(callback);
};

/**
 * @desc stop the timer, remove the element
 */
Countdown.prototype.remove = function () {
  this._clearTimeout();
  this.textEl.remove();
};

/**
 * @desc update the timer for this countdown
 */
Countdown.prototype._updateTimer = function (zeroTimeCallback)
{
  var time, msLeft, mins, currentCount,
      that = this;
  
  function timer () {
    
    msLeft = that.endTime - (+new Date());
    
    if ( msLeft < 1000 ) {
      that.remove();
  
      // Call this function when the timer runs out
      zeroTimeCallback(that.wind);
    } else {
      time = new Date( msLeft );
      mins = time.getUTCMinutes();
      currentCount = mins + ':' + that._twoDigits( time.getUTCSeconds() );
  
      that.textEl.text(currentCount);
  
      that.timeoutID = setTimeout( timer, time.getUTCMilliseconds() + 500 );
    }
  }
  
  timer();
};

/**
 * @desc clear the running timeout for this countdown
 */
Countdown.prototype._clearTimeout = function () {
  clearTimeout(this.timeoutID);
};

/**
 * @desc Padd single digits with a zero
 */
Countdown.prototype._twoDigits = function ( n )
{
  return (n <= 9 ? "0" + n : n);
};


module.exports = Countdown;