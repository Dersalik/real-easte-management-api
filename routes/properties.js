const express = require('express');
const router = express.Router();
const { Property } = require('../models/Property');
const { User } = require('../models/User');
const validatePropertyInput = require('../middlewares/validatePropertyInput');

// @desc   Get all properties
// @route  GET /api/properties
// @access authenticated user
router.get('/', async (req, res) => {
    const properties = await Property.find().sort('name');
    res.status(200).send(properties);
}
);
// @desc   Get a property
// @route  GET /api/properties/:id
// @access authenticated user
router.get('/:id', async (req, res) => {
      
    
        const property = await Property.findById(req.params.id);
        if (!property) return res.status(404).send('The property with the given ID was not found.');
        res.status(200).send(property);
    }
);

//  @desc   Create a property
//  @route  POST /api/properties
//  @access authenticated user
router.post('/',validatePropertyInput, async (req, res) => {

    let owner= await User.findById(req.body.ownerId);
if (!owner) return res.status(404).send('The user with the given ID was not found.');
  



    let property = new Property(req.body);
    await property.save();
    res.send(property);
}   
);

// @desc   Update a property
// @route  PUT /api/properties/:id
// @access authenticated user
router.put('/:id', async (req, res) => {


    let owner= await User.findById(req.body.ownerId);
if (!owner) return res.status(404).send('The user with the given ID was not found.');
  



    try {

        const property = await Property.findByIdAndUpdate(req.params.id, { name: req.body.name, description: req.body.description,
            Owner: req.body.ownerId, address: req.body.location, price: req.body.price
        }, {
           new: true,
           runValidators: true
       });
    
       res.status(200).send(property);

      } catch (error) {
        // If validation fails, return the error response
        return res.status(400).json({ error: error.message });
      }
}
);

// @desc   Delete a property
// @route  DELETE /api/properties/:id
// @access authenticated user
router.delete('/:id', async (req, res) => {
    
        const property = await Property.findByIdAndRemove(req.params.id);
    
        if (!property) return res.status(404).send('The property with the given ID was not found.');
    
        res.status(200).send(property);
    
    }
);

module.exports = router;