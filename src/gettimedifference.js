// Calculate the time difference to countdown to
function getTimeDifference (hours, minutes, seconds) {
  var currentDate, departureDate, dateDifference, minDiff, secDiff;
  
  currentDate = new Date();
  departureDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hours, minutes, seconds);
  
  dateDifference = departureDate - currentDate;
  
  minDiff = Math.floor(dateDifference / (1000*60));
  secDiff = (dateDifference % (1000*60)) / 1000;
  
  return {
    min: minDiff,
    sec: secDiff
  };
}

module.exports = getTimeDifference;