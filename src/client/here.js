// here.mjs
function here(divname) {
    // Initialize the platform object:
    var platform = new H.service.Platform({
        'app_id': '27tUAZv22gvoYaPXYKqA',
        'app_code': 'TFtHPKz9KxfTIWE_1shjqA'
        });
    
    // Obtain the default map types from the platform object
    var maptypes = platform.createDefaultLayers();
    
    // Instantiate (and display) a map object:
    var map = new H.Map(
        document.getElementById(divname),
        maptypes.normal.map,
        {
            zoom: 18,
            center: { lng: -122.39649700000001, lat: 37.787485499999995 }
        }
    );             

    let setMapLocation = (lng, lat) => {
        var marker = new H.map.Marker({
            lng: lng,
            lat: lat
        });
        map.addObject(marker);

        map.setCenter({ lat: lat, lng: lng });

        return { lng: lng, lat: lat };
    };

    return {
        setMapLocation: setMapLocation
    };        
  }
