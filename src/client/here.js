// here.mjs
export function here(divname) {
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
          zoom: 16,
          center: { lng: -122.39649700000001, lat: 37.787485499999995 }
        });
    
        var marker = new H.map.Marker({ 
          lng: -122.39649700000001, 
          lat: 37.787485499999995 });
        map.addObject(marker); 
        
        var router = platform.getRoutingService();
    
        var params = {
        "mode": "fastest;car",
        "waypoint0": "geo!37.787485499999995,-122.39649700000001",
        "waypoint1": "geo!37.784172,-122.401558",
        "representation": "display"
    }
    router.calculateRoute(params, data => {
        if(data.response) {
            data = data.response.route[0];
            let lineString = new H.geo.LineString();
            data.shape.forEach(point => {
                let parts = point.split(",");
                lineString.pushLatLngAlt(parts[0], parts[1]);
            });
            let routeLine = new H.map.Polyline(lineString, {
                style: { strokeColor: "blue", lineWidth: 5 }
            });
            this.map.addObject(routeLine);
        }
    }, error => {
        console.error(error);
    });
    
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
          zoom: 16,
          center: { lng: -122.39649700000001, lat: 37.787485499999995 }
        });
    
        var marker = new H.map.Marker({ 
          lng: -122.39649700000001, 
          lat: 37.787485499999995 });
        map.addObject(marker); 
        
        var router = platform.getRoutingService();
    
        var params = {
        "mode": "fastest;car",
        "waypoint0": "geo!37.787485499999995,-122.39649700000001",
        "waypoint1": "geo!37.784172,-122.401558",
        "representation": "display"
    }
    router.calculateRoute(params, data => {
        if(data.response) {
            data = data.response.route[0];
            let lineString = new H.geo.LineString();
            data.shape.forEach(point => {
                let parts = point.split(",");
                lineString.pushLatLngAlt(parts[0], parts[1]);
            });
            let routeLine = new H.map.Polyline(lineString, {
                style: { strokeColor: "blue", lineWidth: 5 }
            });
            this.map.addObject(routeLine);
        }
    }, error => {
        console.error(error);
    });
  }
