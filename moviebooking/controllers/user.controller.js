const Users = require('../models/user.model');
const TokenGenerator = require("uuid-token-generator");
const { v4: uuidv4 } = require("uuid");
const btoa = require("b2a");

// sign up function
const signUp = (req, res) => {
    // Check if required fields are missing in the request body
    if (!req.body.first_name || !req.body.last_name || !req.body.email || !req.body.password) {
        res.status(400).send({ message: "Required fields cannot be empty" });
        return;
    }

    const user = new User({
        userid : user_id,  
        first_name,        
        last_name,
        email: email_address,
        contact: mobile_number,
        username: first_name + last_name,
        password,
    });

    user.save()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

// login function 
const login = (req, res) => {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Find a user in the database with the provided email and password
    User.findOne({ email, password })
    .then(user => {
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // If a user is found, set isLoggedIn to true and generate a UUID and access token
        user.isLoggedIn = true;
        user.uuid = Math.random().toString(36).substring(7);
        user.accesstoken = Math.random().toString(36).substring(7);
        user.save(); 

        res.send({ message: "Login successful", user });
    })
    .catch(err => {
        res.status(500).send({ message: err.message || "Error occurred while logging in" });
    });
};

// logout function
const logout = async (req, res) => {
    const {uuid} = req.body;
    try {
        const user = await User.findOne({uuid});
    
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // Set the user as logged out
        user.isLoggedIn = false;
        await user.save();
    
        res.status(200).json({ message: 'Logged Out successfully.' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to log out' });
    }
};

// Function to handle the /getCouponCode route
const getCouponCodes = async (req, res) => {
    try {
        const { code } = req.query;
        const authtoken = req.headers.authorization;
        const check_auth = authtoken.split(" ");
        const user = await Users.findOne({ accesstoken: check_auth[1] });

        if (!user) {
            return res.status(406).json({
                message: "no user with this authentication",
            });
        }

        // Filter the user's coupons to find the one with the matching code
        const discount = user.coupens.filter((item) => {
            if (item.id === parseInt(code)) {
                return item;
            }
        });

        if (discount.length === 0) {
            res.status(200).json({ discountValue: 0 });
        } else {
            res.status(200).json({ discountValue: discount[0].discountValue });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Function to handle the /bookShow route
const bookShow = async (req, res) => {
    
    const { customerUuid, bookingRequest } = req.body;

    // Function to generate a random reference number
    function Generate_reference() {
        const min = 10000;
        const max = 99999;
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    let reference_number = Generate_reference();

    const user = await Users.findOne({ uuid: customerUuid });

    if (!user) {
        return res.status(406).json({ message: "User not found" });
    }

    bookingRequest.reference_number = reference_number;

    // Split the tickets string into an array of ticket numbers
    let tickets = bookingRequest.tickets[0].split(",");

    // Convert ticket numbers to integers
    bookingRequest.tickets = tickets.map((item) => parseInt(item));

    user.bookingRequests.push(bookingRequest);
    await user.save();

    res.status(200).json({ reference_number });
};


module.exports = {
    signUp,
    login,
    logout,
    getCouponCodes,
    bookShow
}
