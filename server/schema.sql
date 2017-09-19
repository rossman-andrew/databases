DROP DATABASE chat;

CREATE DATABASE chat;

USE chat;

DROP TABLE IF EXISTS user_names;

CREATE TABLE user_names (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  user_name varchar(1000) NOT NULL
);

DROP TABLE IF EXISTS rooms;

CREATE TABLE rooms (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  room_name varchar(1000) NOT NULL
);

DROP TABLE IF EXISTS messages;

CREATE TABLE messages (
  /* Describe your table here.*/
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  message_text varchar(1000) NOT NULL,
  user_id int NOT NULL,
  room_id int NOT NULL,
  timeCreated int NOT NULL,                   /*change int back to timestamp*/
  FOREIGN KEY (user_id) REFERENCES user_names(id),
  FOREIGN KEY (room_id) REFERENCES rooms(id)
);

/* Create other tables and define schemas for them here! */

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

