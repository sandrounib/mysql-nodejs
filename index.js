var conexao = require('./conexaoBanco');

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
// const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}));

//após instalar npm install ejs...
app.set('view engine', 'ejs');


conexao.connect(function(error){
    if(error){
        console.log("Erro ao conectar ao banco de dados", error);
        process.exit(); //encerrar a conexão caso a conexão falhe
    }
});  


app.get('/', function(req,res){
    res.sendFile(__dirname+ '/cadastro.html');
});

app.post('/', function(req,res) {
    var nomecompleto = req.body.nomecompleto;
    var email = req.body.email;
    var senha = req.body.senha;

       //prevenindo SQL Injection
     var sql = "INSERT INTO estudante(nomecompleto, email, senha) VALUES (?, ?, ?)";
     conexao.query(sql, [nomecompleto,email,senha], function(error, result){
        if(error) throw error;      

         res.redirect('/estudantes');   //para funcionar vá no browser e digita http://localhost:7000  cadastre uma pessoa e ele vai redirecionar para http://localhost:7000/estudantes com o novo usuário cadastrado
     });

    });

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

//Roda de Delete
app.get('/delete-estudante', function(req, res){

    var sql = "delete from estudante where id=?";
    
    var id = req.query.id;

    conexao.query(sql, [id], function(error, result){

        if(error) console.log(error);
        res.redirect('/estudantes');
    });
});

//Rota update
app.get('/update-estudante', function(req, res){

    var sql = "select * from estudante where id=?";

    var id = req.query.id;

    conexao.query(sql, [id], function(error, result){
        if(error) console.log(error);

        req.render(__dirname+'/alterarestudantes', {estudante:result});
    });
});

app.post('/update-estudante', function(req, res){
    var nomecompleto = req.body.nomecompleto;
    var email = req.body.email;
    var senha = req.body.senha;
    var id = req.body.id;

    var sql = "UPDATE estudante SET nomecompleto=?, email=?, senha=? where id=?";

    var id = req.query.id;

    conexao.query(sql, [nomecompleto, email, senha, id], function(error, result){
        if(error) console.log(error);
        res.render(__dirname+'alterarestudantes', {estudante:result});
        res.redirect('/estudantes')
    });
});

app.listen(7000);





/*
// CÓDIGO DA PROFESSORA

var conexao = require ("./conexaoBanco");
var express = require('express');
var app = express();
 
var bodyParser = require('body-parser');
 
app.use(bodyParser.json());
 
app.use(bodyParser.urlencoded({ extended: true }));
 
app.set('view engine', 'ejs');
 
 
//Conexão ao banco de dados uma vez no início
conexao.connect(function(error){
if (error){
    console.error("Erro ao conectar ao banco de dados:", error);
    process.exit(); //encerrar o servidor caso a conexão falhe
}
});
 
 
app.get('/', function(req, res){
  res.sendFile(__dirname+'/cadastro.html');
});
 
app.post('/', function(req, res){
   var nomecompleto = req.body.nomecompleto;
   var email = req.body.email;
   var senha = req.body.senha;
 
    //prevenindo SQL Injection
    var sql = "INSERT INTO estudante(nomecompleto, email, senha) VALUES (?, ?, ?)";
    conexao.query(sql, [nomecompleto, email, senha], function(error, result){
        if(error) throw error;
 
      //res.send("Estudante cadastro com sucesso! " + result.insertId);
 
      res.redirect('/estudantes');
    }); 
});
  
//Leitura do banco de dados
app.get('/estudantes', function(req, res){
 
    var sql = "select * from estudante";
    conexao.query(sql, function(error, result){
        if(error) console.log(error);
       //console.log(result);
       res.render(__dirname+"/estudantes", {estudante:result});
        });
    }); 
 
//Rota de Delete
app.get('/delete-estudante', function(req, res){
 
  var sql = "delete from estudante where id=?";
 
  var id = req.query.id;
 
  conexao.query(sql, [id], function(error, result){
        if(error) console.log(error);
 
        res.redirect('/estudantes'); 
  });
});
 
//Rota update
app.get('/update-estudante', function(req, res){
 
   var sql = "select * from estudante where id=?";
 
   var id = req.query.id;
 
   conexao.query(sql, [id], function(error, result){
        if(error) console.log(error);
 
        res.render(__dirname+'/alterarestudantes', {estudante:result});
   });
});

app.post('/update-estudante', function(req, res){
    var nomecompleto = req.body.nomecompleto;
    var email = req.body.email;
    var senha = req.body.senha;
    var id = req.body.id;

    var sql = "UPDATE estudante SET nomecompleto=?, email=?, senha=? where id=?";

    var id = req.query.id;

    conexao.query(sql, [nomecompleto, email, senha, id], function(error, result){
        if(error) console.log(error);
        res.render(__dirname+'alterarestudantes', {estudante:result});
        res.redirect('/estudantes')
    });
});

 
app.listen(7000);

*/