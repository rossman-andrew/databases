var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(function(err, data) {
        if (err) {
          console.log(err);
          res.end();
        } else {
          // Find out what form the data comes in.
          res.writeHead(200);
          res.end(data);
        }
      });
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      // How to receive chunked data in express (middleware in 'app.js').
      models.messages.post();
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};

