DROP DATABASE IF EXISTS stockportfolio;
CREATE DATABASE stockportfolio;

\c stockportfolio;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    balance INT NOT NULL,
    token VARCHAR NOT NULL
);

CREATE TABLE stocks (
    id SERIAL PRIMARY KEY,
    email VARCHAR REFERENCES users(email),
    stock VARCHAR NOT NULL,
    shares INT NOT NULL
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    email VARCHAR REFERENCES users(email),
    stock VARCHAR NOT NULL,
    shares INT NOT NULL,
    price INT NOT NULL
);

INSERT INTO users (name,email,balance,token) VALUES ('tarek','tarek123@gmail.com',5000,'test');
INSERT INTO stocks (email,stock,shares) VALUES ('tarek123@gmail.com','stockexample',5);
INSERT INTO transactions (email,stock,shares,price) VALUES ('tarek123@email.com','stockexample',5,300);