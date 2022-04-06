const express = require('express');
const app = express();
const port = 3001;
const path = require('path');
const xml = require('xml');
let dataModule = require('./data');

app.engine('.ejs', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));

// static files
app.use('/static', express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    res.send("node xml parser Backend");
});

app.get('/api', (req,res) => {
    return new Promise((resolve, reject) => {
        dataModule.getData2('https://services.mascus.com/api/getexport.aspx?exportid=JTPlant' ).then(xmlData => {
        console.log(xmlData);
        const dataCollector = {
            title: 'Data', 
            data: xmlData
        }
        res.render({dataCollector: dataCollector});
        resolve();
        })
        .catch(err => {
            reject();
        });
    })
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
