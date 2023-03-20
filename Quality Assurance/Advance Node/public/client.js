$(document).ready(function () {
  /*global io*/
  let socket = io();

  socket.on('user', (data) => {
    // console.log(data);
    $('#num-users').text(`${data.currentUsers} users online`);
    let message = `${data.username} has ${data.connected ? 'joined' : 'left'} the chat`;
    $('#messages').append($('<li>').html(`${message}`))
  })

  socket.on('chat message', data => {
    // console.log('listening the emit request of chat message')
    $('#messages').append($('<li>').html(`<b>${data.username}</b> :${data.message}`))
  })

  // socket.on('disconnect', () => {
  //   console.log('Mitra disconnected');
  // })
  // Form submittion with new message in field with id 'm'
  $('form').submit(function () {
    let messageToSend = $('#m').val();
    socket.emit('chat message', messageToSend);
    $('#m').val('');
    return false; // prevent form submit from refreshing page
  });
});
