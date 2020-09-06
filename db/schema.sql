DROP DATABASE IF EXISTS repair_db;

CREATE DATABASE repair_db;

USE repair_db;

CREATE TABLE orders (
    id INT AUTO_INCREMENT,
    firstName VARCHAR (30),
    lastName VARCHAR (30),
    tel VARCHAR (15),
    email VARCHAR (100),
    issue VARCHAR (500),
    orderNum VARCHAR (8),
    received BOOLEAN DEFAULT true,
    waiting BOOLEAN DEFAULT false,
    inProgress BOOLEAN DEFAULT false,
	complete BOOLEAN DEFAULT false,
    primary key(id)
);
