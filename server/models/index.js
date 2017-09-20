var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      var sqlQuery = 'SELECT messages.message_text, rooms.room_name, user_names.user_name FROM messages, rooms, user_names WHERE messages.user_id = user_names.id AND messages.room_id = rooms.id;';
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
      console.log('data: ', data);
      var username = data.username || 'anonymous';
      var message = data.text;
      var room = data.roomname || 'lobby';
      var roomId = `SELECT id FROM rooms WHERE room_name = '${room}';`;
      var userId = `SELECT id FROM user_names WHERE user_name = '${username}';`;
      db.connection.query(roomId, function(err, data) {
        if (err) {
          console.log('error in roomId query: ', err);
          callback(err, null);
          return;
        } else {
          
          // console.log('roomId is being set to this data: ', data[0].id);
          // roomId = data[0].id;
          //if the length of roomId is 0 invoke roomsPost(room) and set roomId to data.insertId
          if (!data[0]) {
            db.connection.query(`INSERT INTO rooms (room_name) VALUES ('${room}');`, function(err, data) {
              if (err) {
                console.log('error while posting new room', err);
                callback(err, null);
                return;
              } else {
                roomId = data.insertId;
                console.log('this is roomId', roomId);
                db.connection.query(userId, function(err, data) {
                  console.log('new data', data);
                  if (err) {
                    console.log('error in userId query: ', err);
                    callback(err, null);
                    return;
                  } else {
                    console.log('userId is being set to this data: ', data[0].id);
                    userId = data[0].id;
                    var messageTableInsert = `INSERT INTO messages (message_text, user_id, room_id) VALUES ('${message}', ${userId}, ${roomId});`;
                    db.connection.query(messageTableInsert, function(err, data) {
                      if (err) {
                        console.log('there was an error inserting message into database');
                        callback(err, null);
                      } else {
                        callback(null, data);
                      }
                    });
                  }
                });       
              }
            });
          } else {
            //console.log('this is the room id (passed 1)', data[0].id);
            roomId = data[0].id;
            //console.log('user_id: ', userId);
            db.connection.query(userId, function(err, data) {
              if (err) {
                console.log('error in userId query: ', err);
                callback(err, null);
              } else {
                if (!data[0]) {
                  db.connection.query(`INSERT INTO user_names (user_name) VALUES ('${username}');`, function(err, data) {
                    if (err) {
                      console.log('there was an error inserting a new name'); 
                      callback(err, null);
                    } else {
                      userId = data.insertId;
                      //console.log('this is the user id (passed 2)', userId);
                      var messageTableInsert = `INSERT INTO messages (message_text, user_id, room_id) VALUES ('${message}', ${userId}, ${roomId});`;
                      db.connection.query(messageTableInsert, function(err, data) {
                        if (err) {
                          console.log('there was an error inserting message into database =)');                          
                          callback(err, null);
                        } else {
                          callback(null, data);
                        }
                      });    
                    }
                  });
                } else {
                  //console.log('userId is being set to this data (*********)', data);
                  userId = data[0].id;
                  console.log('this is the room id (passed 1)', roomId);
                  console.log('this is the user id (passed 2)', userId);
                  console.log('this is the message (passed 3)', message);
                  var messageTableInsert = `INSERT INTO messages (message_text, user_id, room_id) VALUES ('${message}', ${userId}, ${roomId});`;
                  console.log('messageTableInsert: ', messageTableInsert);
                  db.connection.query(messageTableInsert, function(err, data) {
                    if (err) {
                      console.log('there was an error inserting message into database =(');
                      callback(err, null);
                    } else {
                      console.log('Successful message insert, with data: ', data);
                      callback(null, data);
                    }
                  });
                }
              }
            });
          }
        }
      });      
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      var sqlQuery = 'SELECT * FROM user_names;';
      db.connection.query(sqlQuery, function(err, data) {
        if (err) {
          console.log('error in users get request');
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
      var userTableInsert = `INSERT INTO user_names (user_name) VALUES ('${usernameData}');`;
      console.log('userTableInsert: ', userTableInsert);
      db.connection.query(userTableInsert, function(err, data) {
        if (err) {
          console.log('error in users post request');
          callback(err, null);
        } else {
          console.log('users post:', data);
          callback(null, data);
        }
       
      }); 
      // db.connection.end();
    }
  }
};



// INSERT INTO rooms (room_name) VALUES ('plant');
// INSERT INTO user_names (username) VALUES ('John');
// INSERT INTO messages (message_text, user_id, room_id, timeCreated) VALUES ('hello world', 1, 1, 3);

