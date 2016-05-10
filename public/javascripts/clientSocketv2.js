(function(){
    /* declare variables */
    var socket, canvas, context, video, vendorUrl,
        startCall, stopCall, acceptCall, rejectCall,
        media, WIDTH, HEIGHT,
        call, oncall;
    
    
    /* define init */    
    function init(){
        socket = io();
        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');
        video = document.getElementById('video');
        vendorUrl = window.URL || window.webkitURL;
        startCall = document.getElementById("startCall");
        stopCall = document.getElementById("stopCall");
        acceptCall = document.getElementById("accept");
        rejectCall = document.getElementById("reject");
        image.src = "images/chat-app.png"
        WIDTH = 600;
        HEIGHT = 450;
        oncall = false;
        
        navigator.getMedia = navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia ||
                            navigator.msGetUserMedia;
        
        /* event handlers */
        startCall.onclick = joinCall;
        stopCall.onclick = stopVideo;
        test.onclick = testEmit;
        
        /* socket events */
        socket.on('newCall', function(videostream){
            !image.src ? (image.src = "images/chat-app.png") : (image.src = videostream);
        });
        
        socket.on('call', function(data){
            /* prompt for accept or reject
            if accept call draw to emit accept event
            else emit reject
            */
        });
        
        socket.on('accept', function(data){
            /* On accept, take image data and render 
            on image tag or canvas
            */
        });
        
        socket.on('reject', function(data){
            /* display call rejected */
        });
        
        socket.on('endCall', function(data){
            image.src = "images/chat-app.png";
        });
        
        media = null;
        startMediaView();
    }
        
    /* define functions */
    var successCallback = function(stream){
        media = stream.getTracks();
        video.src = vendorUrl.createObjectURL(stream);
        video.play();
    }
    
    var errorCallback = function(error){
        console.log(error);
    }
    
    function draw(video, context, width, height){
        if (oncall){
            context.drawImage(video, 0, 0, width, height);
            socket.emit('newCall', canvas.toDataURL('image/webp', 0.3));
            setTimeout(draw, 100, video, context, width, height);
        }
    }
    
    var startMediaView = function(){
        if (navigator.getMedia){
            navigator.getMedia({ video: true }, successCallback, errorCallback);
        }
    }
    
    var joinCall = function(){
        oncall = true;
        draw(video, context, WIDTH, HEIGHT);
        //video.dispatchEvent(call);
    }
    
    var stopVideo = function(){
        console.log("stopping call")
        oncall = false;
        media.map(function(track){track.stop()});
        socket.emit('endCall', "images/chat-app.png");
        image.src = null;
        init();
    }
    
    init();
    
    /* run program */
    
    /* FUNCTIONS */
    var openApp = function(){
        // open local video
    }
    
    var call = function(){
        // send call event to other party
    }
    
    var accept = function(){
        // send accepted event to other party
        // sned draw event
    }
    
    var accepted = function(){
        // called when accepted event is received, draws and snds data to other
    }
    
})()