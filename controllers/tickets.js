const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports = {
    create,
    new: newTicket
};

function create(req, res) {
    Flight.findById(req.params.id, function(err, flight) {
        Ticket.find({ flight: req.params.id }, function(err, tickets) {
            res.redirect(`/flights/${req.params.id}`, {
                flight,
                seat,
                tickets
            });
        });
    });
}

function newTicket(req, res) {
    res.render('tickets/new', { flightId: req.params.id });
}