var request = require('request');
var FileCookieStore = require('tough-cookie-filestore');

var cookiejar = request.jar(new FileCookieStore(process.env.SG_COOKIE_STORE));
request = request.defaults({ jar: cookiejar });

var options1 = {
    url: process.env.SG_SOURCE_URL,
    followRedirect: true,
    followAllRedirects: true,
    headers: { 'User-Agent': process.env.SG_SOURCE_UA }
}

var options2 = {
    url: process.env.SG_SOURCE_URL2,
    followAllRedirects: true,
    headers: { 'User-Agent': process.env.SG_SOURCE_UA },
    form: {}
}
options2.form[process.env.SG_SOURCE_USERNAME_PARAM] = process.env.SG_SOURCE_USERNAME;
options2.form[process.env.SG_SOURCE_PASSWORD_PARAM] = process.env.SG_SOURCE_PASSWORD;

function getStocksData() {
    var promise = new Promise(function(resolve, reject) {
        request(options1, function(error, response, body) {
            if (error) {
                reject(error);
                return;
            }
            if (response.request.uri.href == options2.url) {
                request.post(options2, function(error, response, body) {
                    if (error) {
                        reject(error);
                        return
                    } else {
                        resolve(body);
                        return;
                    }
                });
            } else {
                resolve(body);
                return;
            }
        });
    });
    return promise;
}

module.exports = {
    getStocksData: getStocksData
}
