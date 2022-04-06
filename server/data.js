var https = require('https');
var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();


parser.on('error', function(err) { console.log('Parser error', err); });

exports.getData2 = (url) => {
    return new Promise((resolve, reject) => {
        var data = '';
        https.get(url, (res) => {
            if (res.statusCode >= 200 && res.statusCode < 400) {
                res.on('data', function(data_) { data += data_.toString(); });
                res.on('end', function() {
                    parser.parseString(data, function(err, result) {
                        //cb(err, result)
                        resolve(result);
                    });
                }).on('error', (err) => {
                    console.error(err);
                });
            }
        }) 
    })
};
