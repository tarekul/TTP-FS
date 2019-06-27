DROP DATABASE if exists stockportfolio;
CREATE DATABASE stockportfolio;

/c stockportfolio

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    token VARCHAR NOT NULL
)

CREATE TABLE stocks (
    id SERIAL PRIMARY KEY,
    userid INT REFERENCES users(id),
    stock VARCHAR NOT NULL,
    shares INT NOT NULL,
    openprice INT NOT NULL
)

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    userid INT REFERENCES users(id),
    stock VARCHAR NOT NULL,
    shares INT NOT NULL,
    price INT NOT NULL
)