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

//CONEXÃO AO BANCO DE DADOS UMA VEZ NO INÍCIO SOMENTE
//lembra que comentei a linha do post e get? conexao.connect(function(error){
// vai ficar aqui agora
conexao.connect(function(error){
    if(error){
        console.log("Erro ao conectar ao banco de dados", error);
        process.exit(); //encerrar a conexão caso a conexão falhe
    }
});  //após isso pode testar e ver se a conexão para de dar erro
//http://localhost:7000/  e cadastra uma pessoa 



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

    //novo  retirado do post porque tá abrindo 2 vzes no get e post
    // conexao.connect(function(error){
    //  if(error) throw error; 

     //prevenindo SQL Injection
     var sql = "INSERT INTO estudante(nomecompleto, email, senha) VALUES (?, ?, ?)";
     conexao.query(sql, [nomecompleto,email,senha], function(error, result){
        if(error) throw error;

        //antes sem o redirect
        //res.send("Estudante cadastrado com sucesso! " + result.insertId);

         res.redirect('/estudantes');   //para funcionar vá no browser e digita http://localhost:7000  cadastre uma pessoa e ele vai redirecionar para http://localhost:7000/estudantes com o novo usuário cadastrado
     });

    });
// })


//com ejs  leitura do banco de dados

//obs quando coloquei ejs alterei a rota para esdudanteS (NO PLURAL antes era no singular)
app.get('/estudantes', function(req, res){ //estudante não existe é apenas para mandar na rota
    // conexao.connect(function(error){  RETIRADO POR DUPLICIDADE  NO POST E AQUI
    //     if(error) console.log(error);

        var sql = "select * from estudante";
        conexao.query(sql, function(error,result){
            if(error) console.log(error);
           // antes SEM EJS
           // console.log(result);

           // a linha abaixo é COM EJS COM O ARQUIVO ESTUDANTES.EJS CRIADO NA RAIZ
           //NOTE QUE VAI SER MELHOR VOU MOSTRAR UM PÁGINA COM TABLE NO BROWSER E NÃO MAIS AQUI NO CONSOLE
           //roda e coloca a rota no browser: http://localhost:7000/estudantes
          
         
           res.render(__dirname+"/estudantes", { estudante:result });
          
        });

    });
// });

app.listen(7000);
