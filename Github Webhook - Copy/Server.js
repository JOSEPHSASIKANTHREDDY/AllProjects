var express = require("express");
var app = express();
var request = require("request");
var port = (process.env.VCAP_APP_PORT || 8080);


var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
/*app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));*/ 



app.get('/',function(req,res){

res.send("Hello World");

});

app.post('/webhook',function(req,res){


/*var body=JSON.stringify(req.body);
console.log("body:"+body+"\n");*/

//console.log(JSON.stringify(req.body.payload.commits));


res.send("Helloworld");
console.log(req.body);

var x =req.body;

console.log(x.commits[0]);

/*var payload = JSON.parse(body.payload);
console.log("payload:"+payload+"\n");
// var Commits=req.body.payload.commits;
var Commits=payload.commits;*/

var Commits=x.commits;
var payloadMail = {
"recipients": "joseph.sasikanth.reddy.byreddy@sap.com",
"subject": "New Update in Code Snippets",
"template": "Template_PHARMA",
"mailText":"<html><head><title>New Update in Code Snippets</title></head><body><h4>Dear All,</h4><p>There have been a few changes to the SCP Code Snippets Please find the details below.</p><p>Comitter:"+Commits[0].author.email+"<br/>Commit Details:"+Commits[0].message+"<br/>Commit Date:"+ new Date(Commits[0].timestamp).toDateString()+"<br/>Commit:"+Commits[0].url+"<br/></p><h3>Notification Center.</h3></body></html>",
};

request.post('https://mockservicea1305c29f.hana.ondemand.com/mockservice/rest/notifymailv2', {json:payloadMail});
//request.post('https://xs01sdctechmo.hana.ondemand.com/NAME-SURNAME/logic.xsjs', {json:body})



});

app.listen(port);
console.log("Server Listening at port 8080");