-- In case of Sequelize issues:
CREATE TABLE IF NOT EXISTS `Customers` (
    `id` INTEGER NOT NULL auto_increment, 
    `firstName` VARCHAR(255) NOT NULL, 
    `lastName` VARCHAR(255) NOT NULL, 
    `tel` VARCHAR(255) NOT NULL, 
    `email` VARCHAR(255), 
    `addr1` VARCHAR(255), 
    `addr2` VARCHAR(255), 
    `city` VARCHAR(255), 
    `state` VARCHAR(255), 
    `zip` VARCHAR(255), 
    `createdAt` DATETIME NOT NULL, 
    `updatedAt` DATETIME NOT NULL, 
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Orders` (
    `id` INTEGER NOT NULL auto_increment,
    `hours` INTEGER, 
    `rate` INTEGER, 
    `partsPrice` INTEGER, 
    `partsNeeded` BLOB, 
    `year` VARCHAR(255) NOT NULL, 
    `make` VARCHAR(255) NOT NULL, 
    `model` VARCHAR(255) NOT NULL, 
    `vin` VARCHAR(255), 
    `color` VARCHAR(255), 
    `issue` BLOB NOT NULL, 
    `photo` VARCHAR(255), 
    `received` TINYINT, 
    `waiting` TINYINT, 
    `inProgress` TINYINT, 
    `complete` TINYINT, 
    `paid` TINYINT, 
    `inView` TINYINT, 
    `createdAt` DATETIME NOT NULL, 
    `updatedAt` DATETIME NOT NULL, 
    `CustomerId` INTEGER, PRIMARY KEY (`id`), 
    FOREIGN KEY (`CustomerId`) REFERENCES `Customers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
);
    

CREATE TABLE IF NOT EXISTS `Users` (
    `id` INTEGER NOT NULL auto_increment , 
    `email` VARCHAR(255) NOT NULL UNIQUE, 
    `password` VARCHAR(255) NOT NULL, 
    `tempPassword` INTEGER, 
    `employee` INTEGER, 
    `first` VARCHAR(255) NOT NULL, 
    `last` VARCHAR(255) NOT NULL, 
    `position` VARCHAR(255), 
    `phone` VARCHAR(255) NOT NULL, 
    `dob` VARCHAR(255), 
    `ssn` VARCHAR(255), 
    `createdAt` DATETIME NOT NULL, 
    `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)
);