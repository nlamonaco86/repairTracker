# repairTracker

## Description

repairTracker is a full-stack application using Node.js, Express, MySQL, Sequelize, Passport, Express-Handlebars, JQuery and Bootstrap. 

This demonstrates full usage of C-R-U-D in a realistic scenario by tracking a repair based on five different statuses (received, in progress, waiting on parts, complete, paid) as one would in an automobile, electronics, appliance or other repair shop. 

Repair techs can log into the Employees section with a valid login (provided by the company's administrator) to manage order status, add photos, view work notes, and update either as needed. Technicians can also generate a printable or .pdf invoice for each work order.  

Administrators are able to create new users and delete orders from the database. Managers can also delete orders.

Customers can view the Tracker page to lookup the current status of their order. 

repairTracker is intended for use on an iPad in a mobile setting, but is responsive to all screen sizes. 

## LOGIN CREDENTIALS: TECHNICIAN: Username:Tech2@company.com / Password: Technician2 (case sesitive)
Deployed Site: https://repairtracker.herokuapp.com/

FUTURE UPDATES: 
- Integration with CarMD or similar API for detailed maintenance time/cost estimations, VIN decoder and Technical Service Bulletins

- Assign different repairs to different Techs, and restrict access to repair orders assigned to them
- Marking an order paid will take in the price paid and log it for daily/weekly/yearly totals and averages 

## Table of Contents

* [Installation](#installation)
* [Usage](#usage)

## Installation

Once you've cloned the repo, you'll need to make sure the following environment variabels are set:

```
MYSQL_USERNAME
MYSQL_PASSWORD
```

Next, open mySQL Workbench and "CREATE DATABASE repair_db;"

Afterwards, create a file ".env" in the root directory. Inside this file, you'll need to set the following environment variables:

```
CLOUDINARY_CLOUDNAME=
CLOUDINARY_UPLOAD_PRESET=

EMAIL_SERVICE=serviceName
EMAIL_USERNAME=yourName@email.com
EMAIL_PASSWORD=yourPassword
```

Cloudinary requires an account at Cloudinary, if omit this step the app will run but the image features won't work. Likewise if if there is no environment avriables for email set, the e-mail features will not work. 

## Usage
![repairTracker](./views/assets/screenshot.png) 
![invoice](./views/assets/screenshot4.png) 
![splash page](./views/assets/screenshot2.png) 
![customer view](./views/assets/screenshot3.png) 

## Questions

Contact [Nlamonaco86](mailto:nlamonaco86@gmail.com) with any questions or suggestions!
