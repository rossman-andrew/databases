var models = require('../models');
var parser = require('body-parser');

module.exports = {
  messages: {
    get: function (req, res) {
      console.log('reached get function');
      models.messages.get(function(err, data) {
        if (err) {
          console.log('there was an error');
          console.log(err);
          res.end();
        } else {
          // Find out what form the data comes in.
          console.log('there was no error');
          res.writeHead(200);
          res.end(data);
        }
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      // How to receive chunked data in express (middleware in 'app.js').
      console.log('Reached message post');
      models.messages.post(req.body.message, function(err, data) {
        if (err) {
          console.log('Error in message post request: ', err);
          res.end();
        } else {
          res.writeHead(201);
          res.end(data);
        }
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('reached users get request');
      models.users.get(function(err, data) {
        if (err) {
          console.log(err);
          res.end();
        } else {
          res.writeHead(200);
          res.end(data);
        }
      });
    },
    post: function (req, res) {
      console.log('reached users post request');
      console.log('data', req.body);
      models.users.post(req.body, function(err, data) {
        if (err) {
          console.log('Error in user post request: ', err);
          res.end(); 
        } else {
          res.writeHead(201);
          res.end(data);
        }
      });
    }
  }
};

