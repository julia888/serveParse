let http = require('http');
const fs = require("fs");
const path = require('path') ;
const express = require("express");
const createError = require('http-errors');
let counter = 0;
const app = express();

app.use(express.static(path.join(__dirname, '/public')));
// const indexPage = require('./routes/index');
// app.get('/', indexPage.get);
app.get('/', handlerCallBack);


app.use(function(req, res, next) {
    next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.status(404).send('Ресурс не найден');
});

const server = http.createServer(app);
server.listen(8099);

// http.createServer(handlerCallBack).listen(8099);//, '10.1.134.13');

// let server = http.createServer(handlerCallBack);
// let currentLocalIp = '10.1.134.13'
// server.listen(8092)//, currentLocalIp);

function handlerCallBack (request,response) {
    console.log('handlerCallBack');
    response.setHeader("Access-Control-Allow-Origin", '*');
    response.writeHead(200, {'Content-Type': 'application/json'}); // обработать коды 400 500 и т.п.
    const data = retrieveJSON (); //'{"x":22,"Y":3,"z":15}'
    console.log('Response to end '+ ++counter);
    response.end(data);
}

function retrieveJSON () {
    var fs = require('fs');

    // return fs.readFileSync('responseFile.json', function (err, data) { //readFile - асинхронно
    return fs.readFile('responseFile.json', function (err, data) { //readFile - асинхронно
        console.log('start reading');
        if (err){
            console.log(err.stack);
            return;
        }else{
            console.log(data);
        }
        console.log('File read');
    })
}

console.log('Server code end');

// На сервере в json изначально 10 полей securitySettings, раз в 5 сек добавляется новое
// GEt  User Vasya
//
// // Get_user_settings
// Get_securitySettings
// get_trading_Sessions
// Get_account_settings { type: start/standart/vip
//
//     Обработать ошибки 400/500
//     Обработать невалидные ответы
