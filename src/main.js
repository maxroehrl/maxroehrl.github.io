import Vue from 'vue';
import App from './App.vue';
import $ from 'jquery';
import vueScrollto from 'vue-scrollto';

Vue.use(vueScrollto);

new Vue({
  el: '#app',
  render: (h) => h(App),
});

$(document).ready(function() {
  // Image overlay
  const overlay = $('#overlay');

  $('img').click(function() {
    overlay.fadeTo(600, 1).css({
      backgroundImage: 'url(' + this.src + ')',
    });
  });
  overlay.click(function() {
    $(this).stop().fadeTo(600, 0, function() {
      $(this).hide();
    });
  });
});

