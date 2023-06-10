const express = require('express');
const router = express.Router();
const { Property } = require('../models/Property');
const { User } = require('../models/User');
const booking = require('../models/Booking');
const validateBookingInput = require('../middlewares/validateBookingInput');

router.get('/', async (req, res) => {
    const bookings = await booking.find().sort('name');
    res.status(200).send(bookings);
}
);

router.get('/:id', async (req, res) => {
    const booking = await booking.findById(req.params.id);
    if (!booking) return res.status(404).send('The booking with the given ID was not found.');
    res.status(200).send(booking);
}
);

router.post('/', async (req, res) => {
    let owner= await User.findById(req.body.ownerId);
    let property =await Property.findById(req.body.propertyId);

    if (!owner || !property) return res.status(404).send('the owner id or property id was not found.');     

    let booking = new booking(req.body);

    booking = await booking.save();

    res.status(200).send(booking);
}
);


router.put('/:id', async (req, res) => {

    let owner= await User.findById(req.body.ownerId);
    let property =await Property.findById(req.body.propertyId);

    if (!owner || !property) return res.status(404).send('the owner id or property id was not found.');   

    try {

        const booking = await booking.findByIdAndUpdate(req.params.id, { startDate: req.body.startDate, endDate: req.body.endDate,
            propertyId: req.body.propertyId, userId: req.body.userId
        }, {
           new: true,
           runValidators: true
       });
    
       res.status(200).send(booking);

      } 
        catch (error) {
        // If validation fails, return the error response
        return res.status(400).json({ error: error.message });
        }

}
);

router.delete('/:id', async (req, res) => {

    const booking = await booking.findByIdAndRemove(req.params.id);
    if (!booking) return res.status(404).send('The booking with the given ID was not found.');
    res.status(200).send(booking);
}
);