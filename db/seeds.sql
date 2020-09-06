INSERT INTO orders (firstName, lastName, tel, issue, orderNum)
VALUES ('Penelope','King','908-555-1234','Replace front struts', '62948765'),
       ('Gordon','Randall','201-555-8679','Alignment & Rotate Tires', '82548654'),
       ('Piers','Davidson','908-555-2358','Front end shakes while braking', '16785043');

INSERT INTO orders (firstName, lastName, tel, issue, orderNum, received, waiting)
VALUES ('Jasmine','Nolan','732-555-8682','Replace torque converter','82945624','0', '1'),
       ('Karen','Baker','732-678-5555','Missing dipstick cap','60123784', '0', '1'),
       ('Neil','Wilson','732-871-4444','Needs Front D/S Headlight','01923754', '0', '1');

INSERT INTO orders (firstName, lastName, tel, issue, orderNum, received, waiting, inProgress)
VALUES ('Caroline','Tayler','732-555-6482','tire rotation & express lube','92648765','0', '0', '1'),
       ('Carl','Avery','732-555-4827','cut rotors, replace pads','58203465','0', '0', '1'),
       ('Joshua','Morgan','732-555-9123','R&R exhaust manifold gasket','20915384','0', '0', '1');

INSERT INTO orders (firstName, lastName, tel, issue, orderNum, received, waiting, inProgress, complete)
VALUES ('John','Piper','908-555-6297','replace alternator & belt','63619486','0', '0', '0', '1'),
       ('Roger','Buckland','856-555-8534','bad camshaft position sensor', '94576125', '0', '0', '0', '1'),
       ('Dennis','Meyers','908-555-1212','R&R muffler, state inspection','48532174','0', '0', '0', '1');
