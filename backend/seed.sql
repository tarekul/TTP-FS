DROP DATABASE IF EXISTS stockportfolio;
CREATE DATABASE stockportfolio;

\c stockportfolio;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    username VARCHAR UNIQUE NOT NULL,
    balance INT NOT NULL,
    token VARCHAR NOT NULL
);

CREATE TABLE stocks (
    id SERIAL PRIMARY KEY,
    username VARCHAR REFERENCES users(username),
    stock VARCHAR NOT NULL,
    shares INT NOT NULL
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    username VARCHAR REFERENCES users(username),
    stock VARCHAR NOT NULL,
    shares INT NOT NULL,
    price INT NOT NULL
);

INSERT INTO users (name,username,balance,token) VALUES ('tarek','tarek123',5000,'test');
INSERT INTO stocks (username,stock,shares) VALUES ('tarek123','stockexample',5);
INSERT INTO transactions (username,stock,shares,price) VALUES ('tarek123','stockexample',5,300);