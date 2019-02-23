let shutterButtonURL = "http://192.168.1.2:8080/ccapi/ver100/shooting/control/shutterbutton/manual";

function getShutterPostObject(responseBody) {
    return {
        method: "POST",
        mode: "no-cors",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(responseBody)
    }
}

function TakePicture() {
    fetch(shutterButtonURL, getShutterPostObject({
        action: "half_press",
        af: true,
    }))
    .then(response => fetch(shutterButtonURL, getShutterPostObject({
        action: "full_press",
        af: true
    })))
    .then(response => fetch(shutterButtonURL, getShutterPostObject({
        action: "release",
        af: false
    })))
    .catch(err => console.log(err))
}
