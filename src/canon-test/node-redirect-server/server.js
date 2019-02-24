const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

let canonDirectoryURL = "http://192.168.1.2:8080/ccapi/ver100/contents/sd/100CANON";
let app = express();
app.use(cors());

app.get("/getThumbnailLink", async (req, res) => {
    let response = await fetch(canonDirectoryURL, {
        method: "GET",
        mode: "cors",
        headers: {
            "Accept": "application/json"
        }
    });
    let json = await response.json();
    let thumbnailURL = json.url[json.url.length - 1];

    res.status(200).json({
        url: thumbnailURL + "?kind=thumbnail"
    });
})

app.listen(3000);
console.log("listening to port 3000");