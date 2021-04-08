const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
const PORT = 3000;
const IGCParser = require('igc-parser');
const download = require('download-file');
const fs = require("fs");


app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const options = {
    directory: "./Download",
    filename: "1"
}

app.post('/api/url', (req, res, callback) => {
    const url = req.body;
    download(url[0].url, options, function (err){
        if(err) throw err
        let result = IGCParser.parse(fs.readFileSync('./Download/1', 'utf8'));
        res.send(JSON.stringify(result));
    })
})

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}, please go to http://localhost:${PORT}`);
})