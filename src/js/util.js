/*
  utils
*/
$.util = {
  getDate: function(timeStamp) {
    var dateObj = new Date(timeStamp);
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();
    var hours = dateObj.getHours();
    var minute = dateObj.getMinutes();
    var seconds = dateObj.getSeconds();
    var currentdate = year + "-" + month + "-" + day + " " + hours + ':' + minute + ':' + seconds;

    return currentdate;
  },
  getTime: function() {
    return new Date().getTime();
  }
};
