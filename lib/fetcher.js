/** Copyright (c) 2013 Toby Jaffey <toby@1248.io>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var request = require('request');
var URI = require('URIjs');

// Implements a simple web proxy for GET /fetch?url=<URL>
exports.fetch = function(req, res) {
    var fullURL = req.protocol + "://" + req.get('host') + req.url;
    var headers = {};
    if (req.headers.authorization !== undefined)
        headers.Authorization = req.headers.authorization;
console.log(URI(req.query.url).absoluteTo(fullURL).toString());

    request.get({
        headers: headers,
        url: URI(req.query.url).absoluteTo(fullURL).toString(),
        rejectUnauthorized: false,
        requestCert: true,
        agent: false
    }, function (error, response, body) {
        if (error) {
            console.log(error);
            res.send(500, error);
        }
        else {
            res.setHeader('Location', response.request.href);
            res.send(response.statusCode, body);
        }
    });
};

// Implements a simple web proxy for POST /post?url=<URL>
exports.post = function(req, res) {
    var fullURL = req.protocol + "://" + req.get('host') + req.url;
    request.post({
        headers: req.headers,
        url: URI(req.query.url).absoluteTo(fullURL).toString(),
        body: JSON.stringify(req.body),
        rejectUnauthorized: false,
        requestCert: true,
        agent: false
    }, function(error, response, body) {
        if (error)
            res.send(response.statusCode, error);
        else
            res.send(response.statusCode, body);
    });
};

// Implements a simple web proxy for DEL /del?url=<URL>
exports.del = function(req, res) {
    var fullURL = req.protocol + "://" + req.get('host') + req.url;
    request.del({
        headers: req.headers,
        url: URI(req.query.url).absoluteTo(fullURL).toString(),
        rejectUnauthorized: false,
        requestCert: true,
        agent: false
    }, function (error, response, body) {
        if (error)
            res.send(response.statusCode, error);
        else
            res.send(response.statusCode, error);
    });
};

