var connection = new signalR.HubConnectionBuilder().withUrl('/chatHub').build();
var btnSend = document.getElementById('sendButton');

btnSend.disabled = true;

connection.on('ReceiveMessage', function(user, message) {
  var msg = message
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  var encodedMsg = user + ' says ' + msg;
  var li = document.createElement('li');
  li.textContent = encodedMsg;
  document.getElementById('messagesList').appendChild(li);
});

connection
  .start()
  .then(function() {
    btnSend.disabled = false;
  })
  .catch(err => {
    return console.error(err.toString());
  });

btnSend.addEventListener('click', sendMessage);

function sendMessage(e) {
  var user = document.getElementById('userInput').value;
  var message = document.getElementById('messageInput').value;

  connection.invoke('SendMessage', user, message).catch(err => {
    console.error(err.toString());
  });

  document.getElementById('messageInput').value = '';

  e.preventDefault();
}
