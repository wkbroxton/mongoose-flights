const Flight = require('../models/flight');

module.exports = {
  create
};

function create(req, res) {
    Flight.findById(req.params.id, function(err, flightInfo) {
      // We can push subdocs into Mongoose arrays
      flightInfo.destinations.push(req.body);
      // Save any changes made to the movie doc
      flightInfo.save(function(err) {
          console.log(flightInfo);
          console.log(err);
        // Step 5:  Respond to the Request (redirect if data has been changed)
        res.redirect(`/flights/${flightInfo._id}`);
      });
    });
  }