var app = require('./express');
var http = require('http');

var server = http.createServer(app);







var io = require('socket.io').listen(server);


//// Send current time every 10 secs
//setInterval(sendTime, 1000);
var InputData={
  'inputParam1':1,
  'inputParam2':2,
  'inputParam3':3,
  'inputParam4':40,
  'inputParam5':50,
  'inputParam6':60,
  'inputParam7':70,
  'inputParam8':80
}
// Emit welcome message on connection

var plcSocket;
io.sockets.on('connection', function(socket) {

  console.log("User Connected : "+socket.id);

    // Use socket to communicate with this particular client only, sending it it's own id

    //Remove it
      // socket.emit('InputFromServer', InputData);
    ////

      socket.on('ConnectionType', function(data) 
       {
        if(data=="PLC")
          plcSocket=socket.id;

        socket.broadcast.emit('iotStatus',"1");

        console.log("plc connected");
       });


      socket.on('checkStatus', function(data) 
       {
        
        id(plcSocket!=null)
        socket.broadcast.emit('iotStatus',"1");

        else
           socket.broadcast.emit('iotStatus',"0");
        
       });


       socket.on('InputFromPLC', function(data) 
       {
        // modify data and emiit

         socket.broadcast.emit('InputFromServer', data);
        });

        socket.on('OutputFromFE', function(data) 
       {
          console.log("OutputFromFE :"+data.index);
          socket.broadcast.emit('OutputToPLC', data);
          console.log("OutputFromFE done")
       });


      socket.on('disconnect', function() {
        if(socket.id==plcSocket)
        {
          plcSocket=null;
          socket.emit('iotStatus',"0");
          console.log("plc disconnected");
        }

        console.log('Got disconnect!');
    });

});


///// code for storing all the clients for advance operation.
/* 
var allClients = [];
io.sockets.on('connection', function(socket) {
   allClients.push(socket);

   socket.on('disconnect', function() {
      console.log('Got disconnect!');

      var i = allClients.indexOf(socket);
      allClients.splice(i, 1);
   });
});
*/






server.listen(3000); // 3000 port in interger
server.on('error', onError);
server.on('listening', onListening);


function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}