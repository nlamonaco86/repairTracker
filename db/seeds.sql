-- ORDER seeds
INSERT INTO orders (userId, customerId, firstName, lastName, tel, email, year, make, model, issue, orderNum, photo, received, waiting, inProgress, complete, createdAt, updatedAt)
VALUES ('2', '1', 'Penelope','King','908-555-1234', 'pKing73@email.com', '2008', 'Nissan', 'Altima', 'Replace front struts & alignment, customer complains of squeaking noise, ensure install noise deadening installed on new springs', '62948765', 'https://di-uploads-pod6.dealerinspire.com/unitednissan/uploads/2018/08/nissan-strut.jpg', '1','0','0','0', '2020-09-29 17:45:51', '2020-09-29 17:45:51' ),
       ('4', '2', 'Gordon','Randall','201-555-8679','gRand79@email.com', '2018', 'Ford', 'Explorer', 'Routine service, alignment & rotate tires, check cabin air filter, air filter, oil life, &27 point safety inspection', '82548654', '', '1','0','0','0', '2020-09-29 17:45:51', '2020-09-29 17:45:51' ),
       ('2', '3', 'Piers','Davidson','908-555-2358','profDavidson@email.com', '2014', 'Honda', 'Pilot', 'Front end shakes while braking, customer had vehicle serviced less than one year ago for same issue', '16785043', 'https://forum.ih8mud.com/attachments/img_6391-jpg.1915800/', '1','0','0','0', '2020-09-29 17:45:51', '2020-09-29 17:45:51' ),
       ('4', '4', 'Jasmine','Nolan','732-555-8682', 'nolanJ@email.com', '2010', 'Toyota', 'Highlander', 'Replace torque converter, remove transmission pan, cleanout debris, flush and refill transmission.','82945624', '', '0','1','0','0', '2020-09-29 17:45:51', '2020-09-29 17:45:51' ),
       ('2', '5', 'Karen','Baker','732-678-5555','QueenKaren@email.com', '2017', 'Dodge', 'Caravan', 'Missing dipstick cap, part is currently out of stock, on backorder from dealership. Customer calls daily to speak with management.','60123784', 'https://www.jbcarpages.com/dodge/grandcaravan/2010/pictures/images/2010_dodge_grandcaravan_picture%20(7).jpg', '0','1','0','0', '2020-09-29 17:45:51', '2020-09-29 17:45:51'),
       ('4', '6', 'Neil','Wilson','732-871-4444','drWilson@email.com', '2016', 'Hyundai', 'Elantra', 'Needs Front D/S Headlamp, part is on backorder, do not reuse old bulbs, will melt new headlamp','01923754', '','0','1','0','0', '2020-09-29 17:45:51', '2020-09-29 17:45:51' ),
       ('2', '7', 'Caroline','Tayler','732-555-6482','taylerChuck@email.com', '2020', 'Mercedes', 'E 350', 'tire rotation & express lube, conduct 27-point safety inspection','92648765', '', '0','0','1','0', '2020-09-29 17:45:51', '2020-09-29 17:45:51' ),
       ('4', '8', 'Carl','Avery','732-555-4827','averySupplies@email.com', '2019', 'Honda', 'Accord', 'cut rotors, replace pads, 27-point safety inspection','58203465', '', '0','0','1','0', '2020-09-29 17:45:51', '2020-09-29 17:45:51' ),
       ('2', '9', 'Joshua','Morgan','732-555-9123','autoSwap@email.com', '2012', 'Ford', 'F-150', 'R&R exhaust manifold gasket, spark plugs, customer needs truck back before next Weds, company vehicle, leave keys in morning pickup box','20915384', 'https://cdn.shopify.com/s/files/1/0040/2689/2361/products/fullsizeoutput_240a.jpeg?v=1548433640', '0','0','1','0', '2020-09-29 17:45:51', '2020-09-29 17:45:51' ),
       ('4', '10', 'John','Piper','908-555-6297','piperFamily@email.com', '2015', 'Hyundai', 'Santa Fe', 'replace alternator & drive belt, also replaced battery as it was nearing end of life, customer is going on road trip for work','63619486', 'https://cdn.instructables.com/ORIG/F3F/DQUC/FOVXOSC0/F3FDQUCFOVXOSC0.jpg?auto=webp','0','0','0','1', '2020-09-29 17:45:51', '2020-09-29 17:45:51' ),
       ('2', '11', 'Roger','Buckland','856-555-8534','buckRogers@email.com', '2012', 'Lexus', 'GX 460', 'bad camshaft position sensor', '94576125', '', '0','0','0','1', '2020-09-29 17:45:51', '2020-09-29 17:45:51' ),
       ('4', '12', 'Dennis','Meyers','908-555-1212','meyerCoConsulting@email.com', '2012', 'Dodge', 'Durango', 'R&R catalytic converter, OK to use salvaged parts, state inspection, cover inspection fee as they are a longtime customer','48532174','https://carfromjapan.com/wp-content/uploads/2018/09/converter-removal.jpg','0','0','0','1', '2020-09-29 17:45:51', '2020-09-29 17:45:51' );

-- CUSTOMER seeds
INSERT INTO customers (first, last, phone, email, createdAt, updatedAt)
VALUES ('Penelope','King','908-555-1234', 'pKing73@email.com', '2020-09-29 17:45:51', '2020-09-29 17:45:51'),
       ('Gordon','Randall','201-555-8679','gRand79@email.com', '2020-09-29 17:45:51', '2020-09-29 17:45:51'),
       ('Piers','Davidson','908-555-2358','profDavidson@email.com', '2020-09-29 17:45:51', '2020-09-29 17:45:51'),
       ('Jasmine','Nolan','732-555-8682', 'nolanJ@email.com', '2020-09-29 17:45:51', '2020-09-29 17:45:51'),
       ('Karen','Baker','732-678-5555','QueenKaren@email.com', '2020-09-29 17:45:51', '2020-09-29 17:45:51'),
       ('Neil','Wilson','732-871-4444','drWilson@email.com', '2020-09-29 17:45:51', '2020-09-29 17:45:51'),
       ('Caroline','Tayler','732-555-6482','taylerChuck@email.com', '2020-09-29 17:45:51', '2020-09-29 17:45:51'),
       ('Carl','Avery','732-555-4827','averySupplies@email.com', '2020-09-29 17:45:51', '2020-09-29 17:45:51'),
       ('Joshua','Morgan','732-555-9123','autoSwap@email.com', '2020-09-29 17:45:51', '2020-09-29 17:45:51' ),
       ('John','Piper','908-555-6297','piperFamily@email.com', '2020-09-29 17:45:51', '2020-09-29 17:45:51'),
       ('Roger','Buckland','856-555-8534','buckRogers@email.com', '2020-09-29 17:45:51', '2020-09-29 17:45:51'),
       ('Dennis','Meyers','908-555-1212','meyerCoConsulting@email.com', '2020-09-29 17:45:51', '2020-09-29 17:45:51');
