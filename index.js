const express = require('express');
const app = express();
const port = 3001;
const path = require('path');
const xml = require('xml');
let dataModule = require('./data');

let xmlData = dataModule.value;

console.log('xmlData: ', xmlData);

app.engine('.ejs', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));

// static files
app.use('/static', express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    res.send("node xml parser");
});

const dataColector = {
    title: 'Data', 
    data: xmlData
}



app.get('/data', (req,res) => {
    res.render('pages/data', {dataColector: dataColector});
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
