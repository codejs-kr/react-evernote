/*!
 *
 * utils
 * @author dodortus (codejs.co.kr / dodortus@gmail.com)
 *
 */
$.util = {
  getDate: function(timeStamp) {
    return moment(timeStamp).format('YYYY-MM-DD hh:mm:ss a');
  },
  getTime: function() {
    return new Date().getTime();
  },
  startFullScreen: function() {
    //console.info('startFullScreen', arguments);
    const el = document.documentElement;
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }
  },
  endFullScreen: function() {
    //console.info('endFullScreen');
    const doc = document;

    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen();
    } else if (doc.webkitExitFullscreen) {
      doc.webkitExitFullscreen();
    }
  }
};
