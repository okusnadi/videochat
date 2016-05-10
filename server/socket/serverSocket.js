var io = function (io) {
    'use strict';
    io.on('connection', function (socket) {
        console.log("received connection from client id: %s", socket.id);
        /* handle events */
        
        /* disconnect event */
        socket.on('disconnect', function(){
            console.log("user id  %s disconnected", socket.id);
        });
        
        /* play event */
        socket.on('test', function(){
            console.log("received test event")
            socket.broadcast.emit('msg', "hello");
        });
        
        /* call */
        socket.on('newCall', function(msg){
            socket.broadcast.emit('newCall', msg);
        });
        
        socket.on('endCall', function(msg){
            io.emit('endCall', msg);
        });
        
        
    });
};

module.exports = io;