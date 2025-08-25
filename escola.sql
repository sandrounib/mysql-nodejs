-- Criar banco de dados

CREATE DATABASE escola;

-- Criar tabela com colunas

CREATE TABLE estudante (
    id INT(10) AUTO_INCREMENT PRIMARY KEY,
    nomecompleto VARCHAR(60) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inserir dados no banco de dados via código SQL (CREATE) do CRUD
INSERT INTO estudante(nomecompleto,email,senha) 
VALUES("Sandro Reis", "sandrpreis1@senacsp.edu.br","123"),
("Luis Santana", "uis@gmail.com", "456"),
("Ruan Miranda", "ruanmiranda@gmail.com", "789");

--Selecionando todos os dados da tabela estudante
SELECT * FROM estudante;

--Selecionando uma coluna na tabela estudante
SELECT email FROM estudante;

--Seleciondo mais de uma coluna na tabela estudante
SELECT nomecompleto, email FROM estudante;