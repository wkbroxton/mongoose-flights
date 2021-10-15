const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
  new: newFlight,
  create,
  index,
  show,
};

function getDefaultDate() {
  let dt = new Flight().departs;
  let departsDate = `${dt.getFullYear()}-${(dt.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
  departsDate += `-${dt.getDate().toString().padStart(2, "0")}T${dt
    .toTimeString()
    .slice(0, 5)}`;
  return departsDate;
}

function show(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    Ticket.find({ flight: req.params.id }, function (err, tickets) {
      res.render("flights/show", {
        flight,
        title: "Details",
        destDate: getDefaultDate(),
        tickets
      });
    });
  });
}

function index(req, res) {
  Flight.find({}, function (err, flights) {
    res.render('flights/index', { "flights": flights });
  });
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
  const flight = new Flight(req.body);
  flight.save(function (err) {
    if (err) return res.render('flights/new');
    res.redirect('/flights');
  });
}

function newFlight(req, res) {
  res.render('flights/new');
}