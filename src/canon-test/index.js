let shutterButtonURL = "http://192.168.1.2:8080/ccapi/ver100/shooting/control/shutterbutton/manual";
let nodeDirectServer = "http://127.0.0.1:3000/getThumbnailLink";

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

async function UpdateThumbnail() {
    let response = await fetch(nodeDirectServer, {
        method: "GET",
        mode: "cors",
        headers: {
            "Accept": "application/json"
        }
    })

    let json = await response.json();
    let imgObject = document.getElementById("thumbnail");
    imgObject.src = json.url;
}

async function TakePicture() {

    await fetch(shutterButtonURL, getShutterPostObject({
        action: "half_press",
        af: true,
    }));

    await fetch(shutterButtonURL, getShutterPostObject({
        action: "full_press",
        af: true
    }));

    await fetch(shutterButtonURL, getShutterPostObject({
        action: "release",
        af: false
    }));

    setTimeout(UpdateThumbnail, 500);
}
