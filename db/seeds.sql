-- CUSTOMER seeds
INSERT INTO customers (id, firstName, lastName, tel, addr1, addr2, city, state, zip, email, createdAt, updatedAt)
VALUES ('16187009', 'Penelope','King','908-555-1234', '123 Main Sreet','','Anytown','NJ','08819', 'pKing73@email.com', '2020-09-29 17:45:51', '2020-09-29 17:45:51'),
       ('10110105', 'Gordon','Randall','201-555-8679', '578 Parkway Drive','Apt. 206','BigCity','NJ','07729', 'gRand79@email.com', '2020-09-29 17:45:51', '2020-09-29 17:45:51'),
       ('11466585', 'Piers','Davidson','908-555-2358', '17 Albany Way','','Walton','NJ','07724', 'profDavidson@email.com', '2020-09-29 17:45:51', '2020-09-29 17:45:51'),
       ('12843896', 'Jasmine','Nolan','732-555-8682', '29 Washington Road','Suite 13 B','Nowhereville','NY','12876', 'nolanJ@email.com', '2020-09-29 17:45:51', '2020-09-29 17:45:51'),
       ('13636238', 'Karen','Baker','732-678-5555', '89 Eighty Ninth Terrace', '', 'Largeton','NJ','14692', 'QueenKaren@email.com', '2020-09-29 17:45:51', '2020-09-29 17:45:51'),
       ('14582553', 'Neil','Wilson','732-871-4444','458 Country Club Lane','','Wealthon','NJ','07736', 'drWilson@email.com', '2020-09-29 17:45:51', '2020-09-29 17:45:51'),
       ('12150485', 'Caroline','Tayler','732-555-6482', '598 Wallace Court','','Smallton','NJ','07737', 'taylerChuck@email.com', '2020-09-29 17:45:51', '2020-09-29 17:45:51'),
       ('10981110', 'Carl','Avery','732-555-4827', '1972 Main Street','Unit 3','Anytown','NJ','08819', 'averyCourier@email.com', '2020-09-29 17:45:51', '2020-09-29 17:45:51'),
       ('15927989', 'Joshua','Morgan','732-555-9123', '16 Industrial Ave','Suite #2C','Industryville','NY','12212', 'autoSwap@email.com', '2020-09-29 17:45:51', '2020-09-29 17:45:51'),
       ('12396078', 'John','Piper','908-555-6297', '17 Picket Fence Lane','','Smallton','NJ','07737', 'piperFamily@email.com', '2020-09-29 17:45:51', '2020-09-29 17:45:51'),
       ('12362500', 'Roger','Buckland','856-555-8534', '331 Jefferson Way','','Anytown','NJ','08819', 'buckRogers@email.com', '2020-09-29 17:45:51', '2020-09-29 17:45:51'),
       ('15505040', 'Dennis','Meyers','908-555-1212', '12 Skylark Drive','Apt. 512','BigCity','NJ','07729', 'meyerCoConsulting@email.com', '2020-09-29 17:45:51', '2020-09-29 17:45:51');

INSERT INTO orders (id, hours, rate, partsPrice, partsNeeded, year, make, model, issue, photo, received, waiting, inProgress, complete, paid, createdAt, updatedAt, customerId)
VALUES ('62948765', '2', '99.99', '269.99', '2x KYB Front Struts, shim kit', '2008', 'Nissan', 'Altima', 'Replace front struts & alignment, customer complains of squeaking noise, ensure install noise deadening installed on new springs', 'https://di-uploads-pod6.dealerinspire.com/unitednissan/uploads/2018/08/nissan-strut.jpg', '1','0','0','0','0', '2020-09-29 17:45:51', '2020-09-29 17:45:51', '16187009'),
       ('82548654', '1', '99.99', '29.99', 'cabin air filter', '2018', 'Ford', 'Explorer', 'Routine service, alignment & rotate tires, check cabin air filter, air filter, oil life, &27 point safety inspection', '', '1','0','0','0','0', '2020-09-29 17:45:51', '2020-09-29 17:45:51', '10110105'),
       ('16785043', '1', '99.99', '0', '','2014', 'Honda', 'Pilot', 'Front end shakes while braking, customer had vehicle serviced less than one year ago for same issue', 'https://forum.ih8mud.com/attachments/img_6391-jpg.1915800/', '1','0','0','0','0', '2020-09-29 17:45:51', '2020-09-29 17:45:51', '11466585'),
       ('82945624', '4', '99.99', '389.99', 'torque converter, refurb OK, transmission pan gasket kit', '2010', 'Toyota', 'Highlander', 'Replace torque converter, remove transmission pan, cleanout debris, flush and refill transmission.', '', '0','1','0','0','0', '2020-09-29 17:45:51', '2020-09-29 17:45:51', '12843896'),
       ('60123784', '1', '0', '29.99', 'dipstack cap, OEM only', '2017', 'Dodge', 'Caravan', 'Missing dipstick cap, part is currently out of stock, on backorder from dealership. Customer calls daily to speak with management.', 'https://www.jbcarpages.com/dodge/grandcaravan/2010/pictures/images/2010_dodge_grandcaravan_picture%20(7).jpg', '0','1','0','0','0', '2020-09-29 17:45:51', '2020-09-29 17:45:51', '13636238'),
       ('01923754', '1', '99.99', '119.99', 'OEM D/S headlamp', '2016', 'Hyundai', 'Elantra', 'Needs Front D/S Headlamp, part is on backorder, do not reuse old bulbs, will melt new headlamp', '','0','1','0','0','0', '2020-09-29 17:45:51', '2020-09-29 17:45:51', '14582553'),
       ('92648765', '1', '99.99', '119.99', 'OEM D/S headlamp', '2020', 'Mercedes', 'E 350', 'tire rotation & express lube, conduct 27-point safety inspection', '', '0','0','1','0','0', '2020-09-29 17:45:51', '2020-09-29 17:45:51', '12150485'),
       ('58203465', '1', '99.99', '89.99', 'New brake pads, ceramic only', '2019', 'Honda', 'Accord', 'cut rotors, replace pads, 27-point safety inspection', '', '0','0','1','0','0', '2020-09-29 17:45:51', '2020-09-29 17:45:51', '10981110'),
       ('20915384', '6', '99.99', '179.99', 'drivers side exhaust manifold, gasket and bolt kit, 8x OEM spark plugs', '2012', 'Ford', 'F-150', 'R&R exhaust manifold gasket, spark plugs, customer needs truck back before next Weds, company vehicle, leave keys in morning pickup box', 'https://cdn.shopify.com/s/files/1/0040/2689/2361/products/fullsizeoutput_240a.jpeg?v=1548433640', '0','0','1','0','0', '2020-09-29 17:45:51', '2020-09-29 17:45:51', '15927989'),
       ('63619486', '2', '99.99', '169.99', 'Alternator, belt for 4cyl enginge', '2015', 'Hyundai', 'Santa Fe', 'replace alternator & drive belt, also replaced battery as it was nearing end of life, customer is going on road trip for work', 'https://cdn.instructables.com/ORIG/F3F/DQUC/FOVXOSC0/F3FDQUCFOVXOSC0.jpg?auto=webp','0','0','0','1','0', '2020-09-29 17:45:51', '2020-09-29 17:45:51', '12396078'),
       ('94576125', '2', '99.99', '39.99', 'camshaft position sensor', '2012', 'Lexus', 'GX 460', 'bad camshaft position sensor', '', '0','0','0','1','0', '2020-09-29 17:45:51', '2020-09-29 17:45:51', '12362500'),
       ('48532174', '2', '99.99', '499.99', 'Catalytic converter, could not salvage, purchased replacement grade', '2012', 'Dodge', 'Durango', 'R&R catalytic converter, OK to use salvaged parts, state inspection, cover inspection fee as they are a longtime customer', 'https://carfromjapan.com/wp-content/uploads/2018/09/converter-removal.jpg','0','0','0','1','0', '2020-09-29 17:45:51', '2020-09-29 17:45:51', '15505040');
