'use strict';

var ref = new Firebase("https://cadesapp.firebaseio.com/");

$(document).ready(init);

function init() {
  $('#add').click(addMessage);

  ref.on('child_added', function(snapshot){
    var value = snapshot.val();
    var $li = $('<li>').text(value);
    $('#output').append($li);
  })


}

function addMessage(){
  var message = $("#message").val();
  $("#message").val('');

  ref.push(message);

}