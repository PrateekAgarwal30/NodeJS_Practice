var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var port = 3000;
var app = express();
var index = require('./route/index');
var task = require('./route/task');

//VIEW ENGINE
app.set('views',path.join(__dirname,'route'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

app.use(express.static(path.join(__dirname,'views')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use('/',index);
app.use('/api',task);

app.listen(port,function(){
    console.log('server running at port ' + port);  
})