$(() => {
    var hereApi = here('here_map');

    let currentLocation = hereApi.setMapLocation(-122.39649700000001, 37.787485499999995);

    $('#north_button').click(() => {
        sendMoveRequest(['forward']);        
    });

    $('#northwest_button').click(() => {
        sendMoveRequest(['forward', 'left']);
    });

    $('#northeast_button').click(() => {
        sendMoveRequest(['forward', 'right']);
    });

    $('#west_button').click(() => {
        sendMoveRequest(['left']);
    });

    $('#east_button').click(() => {
        sendMoveRequest(['right']);
    });

    $('#south_button').click(() => {
        sendMoveRequest(['back']);
    });
    $('#southwest_button').click(() => {
        sendMoveRequest(['back', 'left']);
    });
    $('#southeast_button').click(() => {
        sendMoveRequest(['back', 'right']);
    });

    $('#picture_button').click(() => {
        sendPhotoRequest();
    });
    
    var apiBaseUrl = 'https://devweek2019-robotservice.azurewebsites.net';
    var connection;

    getConnectionInfo().then(info => {
        // make compatible with old and new SignalRConnectionInfo
        info.accessToken = info.accessToken || info.accessKey;
        info.url = info.url || info.endpoint;

        const options = {
            accessTokenFactory: () => info.accessToken
        };

        connection = new signalR.HubConnectionBuilder()
            .withUrl(info.url, options)
            .configureLogging(signalR.LogLevel.Information)
            .build();

        connection.on('newLocation', newLocation);
        connection.on('newPicture', newPhoto);
        connection.onclose(() => console.log('disconnected'));

        console.log('connecting...');
        connection.start()
            .then(() => console.log('connected!'))
            .catch(console.error);

    }).catch(alert);

    function getAxiosConfig() {
        const config = {
            headers: {}
        };
        return config;
    }

    function getConnectionInfo() {
        return axios.post(`${apiBaseUrl}/api/negotiate`, null, getAxiosConfig())
            .then(resp => resp.data);
    }

    function sendLocation(lat, lng) {
        return axios.post(`${apiBaseUrl}/api/location`, {
            latitude: lat,
            longitude: lng        
        }, getAxiosConfig()).then(resp => resp.data);
    }

    function sendMoveRequest(directions) {
        return axios.post(`${apiBaseUrl}/api/requestMove`, {
            directions: directions
        }, getAxiosConfig()).then(resp => resp.data, error => console.log(error));
    }

    function sendPhotoRequest() {
        return axios.post(`${apiBaseUrl}/api/requestPicture`, {
            msg: 'asdf'
        }, getAxiosConfig()).then(resp => resp.data, error => console.log(error));
    }

    function newLocation(message) {
        currentLocation.lng = message.longitude;
        currentLocation.lat = message.latitude;
        hereApi.setMapLocation(currentLocation.lng, currentLocation.lat);
    }

    function newPhoto(photoStream) {
        alert(photoStream);
    }

    //start setting up agora
    var agoraApi = agora('agora_video');

    agoraApi.addStartButton('join_video');

});