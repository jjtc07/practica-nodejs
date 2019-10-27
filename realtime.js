module.exports = (server, sessionMiddleware)  => {
  const io = require('socket.io')(server);
  const redis = require('redis');
  const client = redis.createClient();

  client.subscribe('images')

  io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res, next)
  })

  client.on('message', (channel, message) => {
    console.log('se publico en el canal: ', message);
    
    if (channel == 'images') {
      io.emit('new image', message);
    }
  })

  io.sockets.on('connection', (socket) => {
    console.log('socket user: ', socket.request.session.user_id );
  })
}