'use strict';

var ref = new Firebase("https://cadesapp.firebaseio.com/");
var name;

$(document).ready(init);

function init() {
  $('#add').click(addMessage);
  $("#start").click(start);

  ref.on('child_added', function(snapshot){
    var value = snapshot.val();
    console.log('value:', value);
    var $li = $('<li>').text(value.time + ' ' + value.name + ' ' + value.message);
    $('#output').append($li);
  })
}

function start(){
  name = $('#name').val();
  $('#name').val('');
  if(name.length > 0 && name.length < 15){
    $('.newMessage').show();
    $('.chooseName').hide();
  } else {
    alert('Invalid name.');
  }
}

function addMessage(){
  var message = $("#message").val();
  $("#message").val('');
  ref.push({
    name: name,
    time: Date.now(),
    message: message
  });
}