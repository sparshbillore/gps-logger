# gps-logger

Hello  Here's the project guide :

.................................................................................................

## backend endpoints:


#for user registration </br>
/api/users/      

#for user login </br>
/api/users/login  


#for all the gps logs of all devices   //endpoint is protect to please pass jwt token in header authorisation while making request </br>
/api/devices/summary         



#for gps log details of perticular device //endpoint is protect to please pass jwt token in header authorisation while making request </br>
/api/devices/:deviceId    


..................................................................................................


## .env file should have this structure :

NODE_ENV = development </br>
PORT = 5000 </br>
JWT_SECRET = "your jwt secret here"   </br>
POSTGRES_PASSWORD = "enter your postgres database password here !!!!"</br>

Note: all the values should not be quoted.</br>
for example : </br>
it should be like this </br>
POSTGRES_PASSWORD = randompassword  </br>
not  </br>
POSTGRES_PASSWORD = "randompassword"  </br>





..................................................................................................


## sql file and database details:

sql command for creating user table</br>

 CREATE TABLE users ( </br>
  id serial PRIMARY KEY, </br>
  username VARCHAR(255) NOT NULL UNIQUE, </br>
  email VARCHAR(255) NOT NULL UNIQUE, </br>
  password VARCHAR(255) NOT NULL, </br>
  created_at TIMESTAMP NOT NULL DEFAULT now() </br>
 ); </br>


 sql command for creating GPS table table  </br>

CREATE TABLE gps ( </br>
  id serial PRIMARY KEY, </br> 
  device_id VARCHAR(255) NOT NULL, </br>
  device_type VARCHAR(255) NOT NULL, </br>
  timestamp TIMESTAMP NOT NULL, </br>
  location VARCHAR(255) NOT NULL, </br>
  created_at TIMESTAMP NOT NULL DEFAULT now() </br>
); </br>


 sql command for filling  gps entries into GPS table table  </br>

INSERT INTO GPS (device_id, device_type, timestamp, location) </br>
VALUES  </br>
('D-1567', 'Aircraft', '31-08-2022 10:05', 'L1'), </br>
('D-1567', 'Aircraft', '31-08-2022 10:10', 'L1'), </br>
('D-1567', 'Aircraft', '31-08-2022 10:15', 'L1'), </br>
('D-1567', 'Aircraft', '31-08-2022 10:20', 'L1'), </br>
('D-1567', 'Aircraft', '31-08-2022 10:25', 'L2'), </br>
('D-1568', 'Personal', '31-08-2022 10:05', 'L3'), </br>
('D-1568', 'Personal', '31-08-2022 10:10', 'L3'), </br>
('D-1568', 'Personal', '31-08-2022 10:15', 'L3'), </br>
('D-1568', 'Personal', '31-08-2022 10:20', 'L3'), </br>
('D-1568', 'Personal', '31-08-2022 10:25', 'L3'), </br>
('D-1569', 'Asset', '31-08-2022 10:15', 'L4'), </br>
('D-1569', 'Asset', '31-08-2022 10:20', 'L4'), </br>
('D-1569', 'Asset', '31-08-2022 10:25', 'L1'), </br>
('D-1569', 'Asset', '31-08-2022 10:30', 'L1'), </br>
('D-1569', 'Asset', '31-08-2022 10:35', 'L2'), </br>
('D-1570', 'Personal', '31-08-2022 10:35', 'L5'), </br>
('D-1571', 'Asset', '31-08-2022 10:35', 'L6'); </br>




..................................................................................................




## Here's the features of the project:</br>

1. Use of redux toolkit for state management </br>
2. UI is really clean and user friendly </br>
3. Endpoints are protected with jwt  </br>




