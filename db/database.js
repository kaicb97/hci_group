/*
Install:
--------
http://couchdb.apache.org download
    double click to start CouchDB server locally
configure CouchDB via: http://127.0.0.1:5984/_utils/#_config/couchdb@localhost
    add options enable_cors, bind_address, origins:
      [httpd] <-- section
        enable_cors = true
        bind_address = 0.0.0.0
      [cors] <-- section
        origins = *

Resources:
----------
XMLHttpRequest:
https://en.wikipedia.org/wiki/XMLHttpRequest

CouchDB:
http://guide.couchdb.org/draft/tour.html
https://wiki.apache.org/couchdb/HTTP_Document_API
http://docs.couchdb.org/en/1.6.1/config/intro.html
http://docs.couchdb.org/en/1.6.1/config/http.html#cross-origin-resource-sharing
http://docs.couchdb.org/en/1.6.1/intro/curl.html

HTML(5):
http://www.w3schools.com/html/default.asp
http://www.w3schools.com/jsref/default.asp

Local HTTP server (not strictly needed):
python -m SimpleHTTPServer 8080

CouchDB configuration (Mac OS X):
~/Library/Application Support/CouchDB/etc/couchdb/local.ini
/Applications/Apache CouchDB.app/Contents/Resources/couchdbx-core/etc/couchdb/local.ini
CouchDB configuration (Windows):
C:\Program Files (x86)\Apache Software Foundation\CouchDB\etc\couchdb\local.ini
start/stop/restart: Control Panel --> Services --> Apache CouchDB

[httpd]
enable_cors = true
bind_address = 0.0.0.0
[cors]
origins = *
*/

var loginname = 'admin'
var loginpass = 'couchdb'

var dbname = "gmci";
var dburl = "http://baackfs.com:5984/" + dbname + "/";

function appendData(docName, data) {
    selectFromDB(docName, function(d) {
        var jsonData = JSON.parse(d);

        if("_rev" in jsonData) { 
            data["_id"] = jsonData["_id"];
            data["_rev"] = jsonData["_rev"];
        }


        for (var i = 0; i < jsonData["data"].length; i++) {
            var obj = jsonData["data"][i];

            data["data"].push(obj);
        }

        var req = new XMLHttpRequest();
        req.open("PUT", dburl + docName, true);
        req.setRequestHeader("Authorization", "Basic " + btoa(loginname + ":" + loginpass));
        req.setRequestHeader("Content-type", "application/json");
        req.send(JSON.stringify(data));
    })
}

function updateDB(docName, data) {
    selectFromDB(docName, function(d) {
        var jsonData = JSON.parse(d);

        if("_rev" in jsonData) { 
            data["_id"] = jsonData["_id"];
            data["_rev"] = jsonData["_rev"];
        }

        var req = new XMLHttpRequest();
        req.open("PUT", dburl + docName, true);
        req.setRequestHeader("Authorization", "Basic " + btoa(loginname + ":" + loginpass));
        req.setRequestHeader("Content-type", "application/json");
        req.send(JSON.stringify(data));
    })
}

function selectFromDB(docName, handler) {
    var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if(req.readyState === 4) {
            handler(req.response)
        }
    }

    req.open("GET", dburl + docName);
    req.setRequestHeader("Authorization", "Basic " + btoa(loginname + ":" + loginpass));
    req.setRequestHeader("Content-type", "application/json");
    req.send();
}


var dbname = "gmci";
var dburl = "http://baackfs.com:5984/" + dbname + "/";
var handlers = {
    "order" : storeOrder,
};

function storeOrder(response, order) {
    put(response, order);
}
