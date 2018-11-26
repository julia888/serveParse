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

app.get("/all", function(request, response) {
    response.setHeader("Access-Control-Allow-Origin", '*');
    fs.readFile('responseFile.json', function (err, data) { //readFile - асинхронно
        console.log('start reading');
        if (err) {
            console.log(err.stack);
        }
        if (data) {
            let obj = JSON.parse(data);
            response.send(JSON.stringify(obj));
        }
    });
    console.log('Response to end '+ ++counter);
});

app.get("/securitySettings", function(request, response) {
    response.setHeader("Access-Control-Allow-Origin", '*');
    fs.readFile('responseFile.json', function (err, data) { //readFile - асинхронно
        console.log('start reading');
        if (err) {
            console.log(err.stack);
        }
        if (data) {
            let obj = JSON.parse(data);
            response.send(JSON.stringify(obj.content.securitySettings));
        }
    });
    console.log('Response to end '+ ++counter);
});

app.get("/tradingSessions", function(request, response) {
    response.setHeader("Access-Control-Allow-Origin", '*');
    fs.readFile('responseFile.json', function (err, data) { //readFile - асинхронно
        console.log('start reading');
        if (err) {
            console.log(err.stack);
        }
        if (data) {
            let obj = JSON.parse(data);
            response.send(JSON.stringify(obj.content.tradingSessions));
        }
    });
    console.log('Response to end '+ ++counter);
});

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

// let server = http.createServer(handlerCallBack);
// let currentLocalIp = '10.1.134.13'
// server.listen(8092)//, currentLocalIp);

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
