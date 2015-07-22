(function(document) {
  'use strict';

  var app = document.querySelector('#app');
  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
  });

  app.addEventListener('dom-change', function() {
    // console.log('Our app is ready to rock!');
  });

  var button = document.querySelector("#butts");
  button.addEventListener('click', function(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', encodeURI('/api/entry?entry=asdf'));
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log(xhr.responseText);
      } else {
        console.log("bad" + xhr.responseText);
      }
    };
    xhr.send();
  });

})(document);