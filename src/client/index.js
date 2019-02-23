(() => {
    var hereApi = here('here_map');

    let currentLocation = hereApi.setMapLocation(-122.39649700000001, 37.787485499999995);

    $('#north_button').click(() => {
        currentLocation.lat += .00005;

        hereApi.setMapLocation(currentLocation.lng, currentLocation.lat);
    });

    $('#west_button').click(() => {
        currentLocation.lng += -.00005;

        hereApi.setMapLocation(currentLocation.lng, currentLocation.lat);
    });

    $('#east_button').click(() => {
        currentLocation.lng += .00005;

        hereApi.setMapLocation(currentLocation.lng, currentLocation.lat);
    });

    $('#south_button').click(() => {
        currentLocation.lat += -.00005;

        hereApi.setMapLocation(currentLocation.lng, currentLocation.lat);
    });
})();