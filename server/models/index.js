var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      var sqlQuery = 'SELECT * FROM messages';
      db.connection.query(sqlQuery, function(err, data) {
        if (err) {
          console.log('there was an error');
          callback(err, null);
        } else {
          callback(null, data);
        }
      });
    }, // a function which produces all the messages
    post: function (data, callback) {
      console.log('HELLO!!!!');
      // var username = data;
      var message;
      var room;
      var timeStamp;
      var roomId = `SELECT room_name from rooms WHERE room_name = ${room};`;
      var userId = `SELECT username FROM user_names WHERE username = ${username};`;
      var messageTableInsert = `INSERT INTO messages (message_text, user_id, room_id, timeCreated) VALUES (${message}, ${userId}, ${roomId}, ${timeStamp});`;
      db.connection.query(messageTableInsert, function(err, data) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, data);
        }
      });      
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      var sqlQuery = 'SELECT * FROM user_names';
      db.connection.query(sqlQuery, function(err, data) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, data);
        }
      });      
    },
    post: function (data, callback) {
      var usernameData = data.username;
      console.log('usernameData: ', typeof usernameData);
      //console.log('user_name: ', user_name);
      var userTableInsert = `INSERT INTO user_names (user_name) VALUES (${usernameData})`;
      db.connection.query(userTableInsert, function(err, data) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, data);
        }
      }); 
    }
  }
};



// INSERT INTO rooms (room_name) VALUES ('plant');
// INSERT INTO user_names (username) VALUES ('John');
// INSERT INTO messages (message_text, user_id, room_id, timeCreated) VALUES ('hello world', 1, 1, 3);

