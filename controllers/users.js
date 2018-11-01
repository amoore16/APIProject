const User = require('../models/user');
const Car = require('../models/car');

module.exports = {
    //get all users
    index: async (req, res, next) => {
            const users = await User.find({});
            res.status(200).json(users);
    },
    //post new
    newUser: async (req, res, next) => {
            const newUser = new User(req.body);
            const user = await newUser.save();
            res.status(201).json(user);
        
    },
    //get user by id
    getUser: async (req, res, next) => {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('cars');
        res.status(200).json(user);
    },

    replaceUser: async (req, res, next) => {
        const { userId } = req.params;
        const newUser = req.body;
        const result = await User.findByIdAndUpdate( userId, newUser );
        res.status(200).json({ success: true });
    },

    updateUser: async (req, res, next) => {
        const { userId } = req.params;
        const newUser = req.body;
        const result = await User.findByIdAndUpdate( userId, newUser );
        res.status(200).json({ success: true });
    },

    getUserCars: async (req, res, next) => {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('cars');
        res.status(200).json(user.cars);
    },

    newUserCar: async (req, res, next) => {
        //using this user id
        const { userId } = req.params;
        //create new car
        const newCar = new Car(req.body);
        //get user
        const user = await User.findById(userId);
        //Assign user as a car's seller
        newCar.seller = user;
        //save car
        await newCar.save();
        //add car to the user's selling cars array
        user.cars.push(newCar);
        //save the user
        await user.save();
        //send result
        res.status(201).json(newCar);        
    }

};
