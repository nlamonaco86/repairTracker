DROP DATABASE IF EXISTS burger_db;

CREATE DATABASE burger_db;

USE burger_db;

CREATE TABLE burgers (
    id INT AUTO_INCREMENT,
    firstName VARCHAR (30),
    lastName VARCHAR (30),
    tel VARCHAR (15),
    issue VARCHAR (500),
    received BOOLEAN DEFAULT true,
    waiting BOOLEAN DEFAULT false,
    inProgress BOOLEAN DEFAULT false,
	devoured BOOLEAN DEFAULT false,
    primary key(id)
);

SELECT * FROM burgers;

