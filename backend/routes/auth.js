const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_TOKEN_KEY = 'N0mAnBaNYGa$';


// Create a User using: POST "/api/auth/createuser" No login required
router.post('/createuser', [
    body("name", "Please enter a valid name!").isLength({ min: 3 }),
    body("email", "Please enter a valid email!").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({ min: 5 }),
], async (req, res) => {

    // If there are any errors, return Bad request and the errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        // Check whether the user with this email exists  already
        let user = await User.findOne({ email: req.body.email });
        console.log(user);
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        // Create a new User
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_TOKEN_KEY);
        // console.log(jwtData);

        // res.json(user);
        res.json({ authToken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

// Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
    body("email", "Please enter a valid email!").isEmail(),
    body("password", "Password cannot be blank").exists(),
], async (req, res) => {
    // If there are any errors, return Bad request and the errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_TOKEN_KEY);
        res.json({ authToken });


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router;