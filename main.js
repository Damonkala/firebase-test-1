'use strict';

var ref = new Firebase("https://baconjelly.firebaseio.com/");

var chatRef = ref.child('chat');
var usersRef = ref.child('users');

var name;

$(document).ready(init);

function init() {
  $('#add').click(addMessage);
  $("#start").click(start);
  $("#logout").click(logout);
  
  $(window).on('beforeunload', logout)

  chatRef.on('child_added', function(snapshot){
    var value = snapshot.val();
    var $li = $('<li>').text(value.time + ' ' + value.name + ' ' + value.message);
    $('#output').append($li);
  });

  usersRef.on('value', function(snapshot){
    $('#users').empty();

    var users = snapshot.val();

    var $lis = [];

    for(var key in users){
      var $li = $('<li>').text(users[key]);
      $lis.push($li);
    }
    $('#users').append($lis);
  });

}

function logout(){
  usersRef.once('value', function(snapshot){
    var users = snapshot.val();
    for(var key in users){
      if(users[key] === name){
        usersRef.child(key).remove();
      }
    }
    $("#output").hide();
    $('.newMessage').hide();
    $('.chooseName').show();

  });
}

function start(){
  name = $('#name').val();
  $('#name').val('');
  if(name.length > 0 && name.length < 15){
    $("#output").show();
    $('.newMessage').show();
    $('.chooseName').hide();
    usersRef.push(name);
  } else {
    alert('Invalid name.');
  }
}

function addMessage(){
  var message = $("#message").val();
  $("#message").val('');
  chatRef.push({
    name: name,
    time: Date.now(),
    message: message
  });
}