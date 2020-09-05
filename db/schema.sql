DROP DATABASE IF EXISTS burger_db;

CREATE DATABASE burger_db;

USE burger_db;

CREATE TABLE burgers (
    id INT AUTO_INCREMENT,
    firstName VARCHAR (30),
    lastName VARCHAR (30),
    tel VARCHAR (15),
    issue VARCHAR (500),
    devoured BOOLEAN DEFAULT false,
    waiting BOOLEAN DEFAULT false,
    primary key(id)
);

