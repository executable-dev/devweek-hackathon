//Code from samples at https://github.com/digitallysavvy/group-video-chat
//Thank you Hermes for the excellent advice!
function agora(video_div_name) {
    var appId = '9b9806a1a8a94de9b871bb7f389f27b7';

    // video profile settings
    var cameraVideoProfile = '480_4'; // 640 × 480 @ 30fps  & 750kbs
    var screenVideoProfile = '480_2'; // 640 × 480 @ 30fps

    // create client instances for camera (client) and screen share (screenClient)
    var client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
    var screenClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

    // stream references (keep track of active streams) 
    var remoteStreams = {}; // remote streams obj struct [id : stream] 

    var localStreams = {
        camera: {
            id: "",
            stream: {}
        },
        screen: {
            id: "",
            stream: {}
        }
    };

    var mainStreamId; // reference to main stream
    var screenShareActive = false; // flag for screen share 

    function initClientAndJoinChannel(agoraAppId, channelName) {
        // init Agora SDK
        client.init(agoraAppId, function () {
            console.log("AgoraRTC client initialized");
            joinChannel(channelName); // join channel upon successfull init
        }, function (err) {
            console.log("[ERROR] : AgoraRTC client init failed", err);
        });
    }

    client.on('stream-published', function (evt) {
        console.log("Publish local stream successfully");
    });

    // connect remote streams
    client.on('stream-added', function (evt) {
        var stream = evt.stream;
        var streamId = stream.getId();
        console.log("new stream added: " + streamId);
        // Check if the stream is local
        if (streamId != localStreams.screen.id) {
            console.log('subscribe to remote stream:' + streamId);
            // Subscribe to the stream.
            client.subscribe(stream, function (err) {
                console.log("[ERROR] : subscribe stream failed", err);
            });
        }
    });

    client.on('stream-subscribed', function (evt) {
        var remoteStream = evt.stream;
        var remoteId = remoteStream.getId();
        remoteStreams[remoteId] = remoteStream;
        console.log("Subscribe remote stream successfully: " + remoteId);
        //if ($('#' + video_div_name).is(':empty')) {
            mainStreamId = remoteId;
            remoteStream.play(video_div_name);
        //} else {
        //    addRemoteStreamMiniView(remoteStream);
        //}
    });

    // join a channel
    function joinChannel(channelName) {
        //var token = generateToken();
        var token = null;
        var userID = null; // set to null to auto generate uid on successfull connection
        client.join(token, channelName, userID, function (uid) {
            console.log("User " + uid + " join channel successfully");
            createCameraStream(uid);
            localStreams.camera.id = uid; // keep track of the stream uid 
        }, function (err) {
            console.log("[ERROR] : join channel failed", err);
        });
    }

    // video streams for channel
    function createCameraStream(uid) {
        var localStream = AgoraRTC.createStream({
            streamID: uid,
            audio: true,
            video: true,
            screen: false
        });
        localStream.setVideoProfile(cameraVideoProfile);
        localStream.init(function () {
            console.log("getUserMedia successfully");
            // TODO: add check for other streams. play local stream full size if alone in channel
            localStream.play('local-video'); // play the given stream within the local-video div

            // publish local stream
            client.publish(localStream, function (err) {
                console.log("[ERROR] : publish local stream error: " + err);
            });

            enableUiControls(localStream); // move after testing
            localStreams.camera.stream = localStream; // keep track of the camera stream for later
        }, function (err) {
            console.log("[ERROR] : getUserMedia failed", err);
        });
    }


    addStartButton = (buttonId) => {
        $("#" + buttonId).click(() => {
            var agoraAppId = $('#form-appid').val();
            var channelName = $('#form-channel').val();
            initClientAndJoinChannel(appId, "devweek-robot");
        });
    };

    return {
        addStartButton: addStartButton
    };
}