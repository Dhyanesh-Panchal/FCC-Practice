$(document).ready(function () {
  /*global io*/
  let socket = io();

  socket.on('user', (data) => {
    // console.log(data);
    $('#num-users').text(`${data.currentUsers} users online`);
    let message = `${data.username} has ${data.connected ? 'joined' : 'left'} the chat`;
    $('#messages').append($('<li>').html(`${message}`))
  })

  // socket.on('disconnect', () => {
  //   console.log('Mitra disconnected');
  // })
  // Form submittion with new message in field with id 'm'
  $('form').submit(function () {
    var messageToSend = $('#m').val();

    $('#m').val('');
    return false; // prevent form submit from refreshing page
  });
});
