var eyes = require('eyes');
var https = require('https');
var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();


parser.on('error', function(err) { console.log('Parser error', err); });

const getData = (url, cb) => {
    var data = '';
    https.get(url, function(res) {
        if (res.statusCode >= 200 && res.statusCode < 400) {
            res.on('data', function(data_) { data += data_.toString(); });
            res.on('end', function() {
                parser.parseString(data, function(err, result) {
                    cb(err, result)
                });
            }).on('error', (err) => {
                console.error(err);
            });
        }
    })
}

exports.value = getData('https://services.mascus.com/api/getexport.aspx?exportid=JTPlant', (err, res) => {
                    if (err) console.error(err);
                    return res; 
                })

