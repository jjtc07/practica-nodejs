module.exports = (server, sessionMiddleware)  => {
  const io = require('socket.io')(server);
  io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res, next)
  })

  io.sockets.on('connection', (socket) => {
    console.log('socket user: ', socket.request.session.user_id );
  })
}