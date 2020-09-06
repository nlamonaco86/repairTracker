INSERT INTO burgers (firstName,lastName,tel,issue)
VALUES ('RECEIVED','RECEIVED','7325551234','Replace front struts');

INSERT INTO burgers (firstName,lastName,tel,issue, received, waiting)
VALUES ('WAITING','WAITING','7325551234','replace torque converter','0', '1');

INSERT INTO burgers (firstName,lastName,tel,issue, received, waiting, inProgress)
VALUES ('IN','PROGRESS','7325551234','tire rotation & express lube','0', '0', '1');

INSERT INTO burgers (firstName,lastName,tel,issue, received, waiting, inProgress, devoured)
VALUES ('DONE','DONE','7325551234','cut rotors, replace brake pads','0', '0', '0', '1');
