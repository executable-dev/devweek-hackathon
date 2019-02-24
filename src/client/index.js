(() => {
    var hereApi = here('here_map');

    let currentLocation = hereApi.setMapLocation(-122.39649700000001, 37.787485499999995);

    $('#north_button').click(() => {
        currentLocation.lat += .00005;

        sendLocation(currentLocation.lat, currentLocation.lng);
        //connection.send('location', {latitude:currentLocation.lat, longitude:currentLocation.lng});
        //hereApi.setMapLocation(currentLocation.lng, currentLocation.lat);
    });

    $('#west_button').click(() => {
        currentLocation.lng += -.00005;

        sendLocation(currentLocation.lat, currentLocation.lng);
        //hereApi.setMapLocation(currentLocation.lng, currentLocation.lat);
    });

    $('#east_button').click(() => {
        currentLocation.lng += .00005;

        sendLocation(currentLocation.lat, currentLocation.lng);
        //hereApi.setMapLocation(currentLocation.lng, currentLocation.lat);
    });

    $('#south_button').click(() => {
        currentLocation.lat += -.00005;

        sendLocation(currentLocation.lat, currentLocation.lng);
        //hereApi.setMapLocation(currentLocation.lng, currentLocation.lat);
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

        connection.on('newLocation', newMessage);
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

    function newMessage(message) {
        hereApi.setMapLocation(message.longitude, message.latitude);
    }

})();