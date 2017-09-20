var models = require('../models');
var parser = require('body-parser');

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

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
          res.writeHead(200, headers);
          res.end(JSON.stringify(data));
        }
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      // How to receive chunked data in express (middleware in 'app.js').
      console.log('Reached message post');
      console.log('req.body: ', req.body);
      models.messages.post(req.body, function(err, data) {
        if (err) {
          console.log('Error in message post request: ', err);
          res.end();
        } else {
          console.log('the data was: ', data);
          // res.writeHead(201, headers);
          res.status(201);
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
          res.writeHead(200, headers);
          res.end(data.toString());
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
          console.log('got into the else block');
          res.writeHead(201, headers);
          res.end();
        }
      });
    }
  }
};

