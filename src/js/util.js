/*!
 *
 * utils
 * @author dodortus (codejs.co.kr / dodortus@gmail.com)
 *
 */
$.util = {
  getDate: function(timeStamp) {
    var currentDate = moment(timeStamp).format('YYYY-MM-DD hh:mm:ss a');
    return currentDate;
  },
  getTime: function() {
    return new Date().getTime();
  }
};
