var express = require('express');
var mysql =  require('mysql');
var bodyParser = require('body-parser');
var app = express();


var connection = mysql.createPool({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'admin',
    database : 'datebase'
});

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//GET接口
//获取验证码
app.get('/yzm/:id', function(req, res){
    var id = req.params.id;
    connection.getConnection(function (error,connect) {
        if(error !=null) {
            console.log('error ' + error);
            connect.release();
        } else {
            console.log('GET接口，获取最近' + id + '个验证码');
            connect.query("SELECT * FROM `cas_yzm` ORDER BY `ctime` DESC LIMIT 0, " + id, function (error, rows, fields) {
                connect.release();
                if(error !=null){
                    console.log('error ' + error);
                } else {
                    res.json(rows);
                }
            })
        }
    })
});
// 获取用户信息
app.get('/user/:username', function(req, res){
    var username = req.params.username;
    connection.getConnection(function (error,connect) {
        if(error !=null) {
            console.log('error ' + error);
            connect.release();
        } else {
            console.log('GET接口，获取' + username + '用户信息');
            connect.query("SELECT * FROM cas_user WHERE username = " + username, function (error, rows, fields) {
                connect.release();
                if(error !=null){
                    console.log('error ' + error);
                } else {
                    res.json(rows);
                }
            })
        }
    })
});
// 获取餐饮订单信息
app.get('/cy/:cy_number', function(req, res){
    var cy_number = req.params.cy_number;
    connection.getConnection(function (error,connect) {
        if(error !=null) {
            console.log('error ' + error);
            connect.release();
        } else {
            console.log('GET接口，获取餐饮订单' + cy_number + '信息');
            connect.query("SELECT * FROM menus_order WHERE menus_order.order_number = " + cy_number, function (error, rows, fields) {
                connect.release();
                if(error !=null){
                    console.log('error ' + error);
                } else {
                    res.json(rows);
                }
            })
        }
    })
});
// 获取买单订单信息
app.get('/md/:md_number', function(req, res){
    var md_number = req.params.md_number;
    connection.getConnection(function (error,connect) {
        if(error !=null) {
            console.log('error ' + error);
            connect.release();
        } else {
            console.log('GET接口，获取买单订单' + md_number + '信息');
            connect.query("SELECT * FROM cas_transfer WHERE cas_transfer.transfer_number = " + md_number, function (error, rows, fields) {
                connect.release();
                if(error !=null){
                    console.log('error ' + error);
                } else {
                    res.json(rows);
                }
            })
        }
    })
});
//GET接口

/*
//  POST请求
app.post('/user', function(req, res){
    var name = req.body.name;
    var description = req.body.description;
    connection.getConnection(function (error,connect) {
        if(error !=null) {
            console.log('error ' +error);
            connect.release();
        } else {
            console.log('connected!');
            connect.query("INSERT INTO user (name,description) VALUES('"+name +"','"+description+"')", function (error, rows, fields) {
                connect.release();
                if(error !=null){
                    console.log('error ' + error);
                } else {
                    res.json('success');
                }
            })
        }
    })
});
*/

app.listen(3000, function () {
    console.log('app listening on port 3000!');
});
