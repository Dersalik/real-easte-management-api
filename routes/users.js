const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const validateUserInput = require('../middlewares/validateUserInput');
const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

router.get('/', async (req, res) => {
    const users = await User.find().sort('name');
    res.status(200).send(users);
}
);

router.get('/:id', async (req, res) => {

    const user= await User.findById(req.params.id);
    if (!user) return res.status(404).send('The user with the given ID was not found.');
    res.status(200).send(user);
});

router.post('/register',validateUserInput, async (req, res) => {


    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(404).send('User already registered.');

    user = new User(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    res.send(_.pick(user, ['name', 'email', 'isAdmin']));
});



router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
      const token = jwt.sign({ email: user.email }, config.secretKey, { expiresIn: config.expiresIn });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error authenticating user' });
    }
  });


router.put('/:id', async (req, res) => {

const user= await User.findById(req.params.id);
if (!user) return res.status(404).send('The user with the given ID was not found.');

    try {
        const user = await User.findByIdAndUpdate(req.params.id, { name: req.body.name, email: req.body.email,
        }, {
           new: true,
           runValidators: true
       });



        res.status(200).send(user);

      } catch (error) {
        // If validation fails, return the error response
        return res.status(400).json({ error: error.message });
      }


});

router.delete('/:id', async (req, res) => {
    const user= await User.findById(req.params.id);
    if (!user) return res.status(404).send('The user with the given ID was not found.');

    await User.findByIdAndRemove(req.params.id);

    res.status(200).send(user);
});


module.exports = router;