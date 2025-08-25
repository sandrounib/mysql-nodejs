// var mysql = require('mysql');

// var conecteBanco = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "escola"
// });

// var conexao = require("./conexaoBanco");

// ANTES
// conecteBanco.connect(function(error){
//     if(error) throw error;
//     console.log("O banco de dados foi conectado! ");

// conexao.connect(function(error){
//     if(error) throw error; 

//     conexao.query("select * from estudante", function(error, result){
//         if(error) throw error;
//         console.log(result[0]);
//         console.log(result[0].nomecompleto);
//     });
// });
var conexao = require('./conexaoBanco');

var express = require('express');
var app = express();

var bodyparser = require('body-parser');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyparser.urlencoded({ extended: true}));

//após instalar npm install ejs...
app.set('view engine', 'ejs');





app.get('/', function(req,res){
    res.sendFile(__dirname+ '/cadastro.html');
});

// app.post('/', function(req,res) {
//     console.log(req.body);
// })

app.post('/', function(req,res) {
    var nomecompleto = req.body.nomecompleto;
    var email = req.body.email;
    var senha = req.body.senha;

    //novo
    conexao.connect(function(error){
     if(error) throw error; 

     //prevenindo SQL Injection
     var sql = "INSERT INTO estudante(nomecompleto, email, senha) VALUES (?, ?, ?)";
     conexao.query(sql, [nomecompleto,email,senha], function(error, result){
        if(error) throw error;

        res.send("Estudante cadastrado com sucesso! " + result.insertId);
     });

    });
})


//com ejs  leitura do banco de dados

app.get('/estudante', function(req,res){ //estudante não existe é apenas para mandar na rota
    conexao.connect(function(error){
        if(error) console.log(error);

        var sql = "select * from estudante";
        conexao.query(sql, function(error,result){
            if(error) console.log(error);
            console.log(result);
        });

    });
});

app.listen(7000);
