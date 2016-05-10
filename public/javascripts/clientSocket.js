(function(){
    /* declare variables */
    var socket, canvas, context, video, vendorUrl,
        startCall, stopCall, startMedia, test,
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
        startMedia = document.getElementById("startMedia");
        startMedia = document.getElementById("startMedia");
        test = document.getElementById("test");
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
        
        /* socket events */
        socket.on('newCall', function(videostream){
            !image.src ? (image.src = "images/chat-app.png") : (image.src = videostream);
        });
        
        socket.on('endCall', function(videostream){
            image.src = "images/chat-app.png";
        });
        
        socket.on('msg', function(data){
            console.log(data);
        });
        
        /* custom events */
        /*call = new Event('call');
        video.addEventListener('call', function(){
            draw(this, context, WIDTH, HEIGHT);
        });*/
        
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
    
    var testEmit = function(){
        socket.emit('test', "message");
    }
    
    init();
    
    
    /* run program */
    
    
})()